import { Controller, Post, Req, Res, Headers, RawBodyRequest, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { PrismaService } from '../prisma/prisma.service';
import { StripeService } from '../billing/stripe.service';
import { CreditsService } from '../credits/credits.service';
import { ConfigService } from '@nestjs/config';
import { Webhook } from 'svix';
import Stripe from 'stripe';

@Controller('webhooks')
export class WebhooksController {
  private readonly logger = new Logger(WebhooksController.name);

  constructor(
    private prisma: PrismaService,
    private stripeService: StripeService,
    private creditsService: CreditsService,
    private config: ConfigService,
  ) {}

  @Post('stripe')
  async handleStripeWebhook(
    @Req() req: RawBodyRequest<Request>,
    @Res() res: Response,
    @Headers('stripe-signature') signature: string,
  ) {
    let event: Stripe.Event;

    try {
      event = this.stripeService.constructWebhookEvent(req.rawBody!, signature);
    } catch (err) {
      this.logger.error(`Stripe webhook signature verification failed: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    try {
      switch (event.type) {
        case 'checkout.session.completed':
          await this.handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
          break;

        case 'invoice.paid':
          await this.handleInvoicePaid(event.data.object as Stripe.Invoice);
          break;

        case 'customer.subscription.updated':
          await this.handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
          break;

        case 'customer.subscription.deleted':
          await this.handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
          break;

        default:
          this.logger.log(`Unhandled Stripe event: ${event.type}`);
      }
    } catch (err) {
      this.logger.error(`Error processing Stripe event ${event.type}: ${err.message}`);
    }

    return res.status(200).json({ received: true });
  }

  private async handleCheckoutCompleted(session: Stripe.Checkout.Session) {
    const userId = session.metadata?.userId;
    const tier = session.metadata?.tier;
    if (!userId) return;

    if (session.mode === 'subscription' && session.subscription) {
      const subscription = await this.stripeService.stripe.subscriptions.retrieve(
        session.subscription as string,
      );

      await this.prisma.subscription.upsert({
        where: { userId },
        create: {
          userId,
          stripeSubscriptionId: subscription.id,
          stripePriceId: subscription.items.data[0].price.id,
          status: subscription.status,
          currentPeriodStart: new Date(subscription.current_period_start * 1000),
          currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        },
        update: {
          stripeSubscriptionId: subscription.id,
          stripePriceId: subscription.items.data[0].price.id,
          status: subscription.status,
          currentPeriodStart: new Date(subscription.current_period_start * 1000),
          currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        },
      });

      if (tier) {
        await this.prisma.user.update({
          where: { id: userId },
          data: { tier },
        });

        const credits = this.stripeService.getCreditsForTier(tier);
        await this.creditsService.grantSubscriptionCredits(
          userId,
          credits,
          new Date(subscription.current_period_end * 1000),
        );
      }
    }

    if (session.mode === 'payment') {
      const credits = parseInt(session.metadata?.credits || '0', 10);
      if (credits > 0) {
        await this.creditsService.addPurchasedCredits(
          userId,
          credits,
          `Credit pack purchase (${credits} credits)`,
        );
      }
    }
  }

  private async handleInvoicePaid(invoice: Stripe.Invoice) {
    if (!invoice.subscription) return;

    const subscription = await this.prisma.subscription.findUnique({
      where: { stripeSubscriptionId: invoice.subscription as string },
      include: { user: true },
    });
    if (!subscription) return;

    const credits = this.stripeService.getCreditsForTier(subscription.user.tier);
    const stripeSub = await this.stripeService.stripe.subscriptions.retrieve(
      invoice.subscription as string,
    );

    await this.prisma.subscription.update({
      where: { id: subscription.id },
      data: {
        currentPeriodStart: new Date(stripeSub.current_period_start * 1000),
        currentPeriodEnd: new Date(stripeSub.current_period_end * 1000),
        status: stripeSub.status,
      },
    });

    await this.creditsService.grantSubscriptionCredits(
      subscription.userId,
      credits,
      new Date(stripeSub.current_period_end * 1000),
    );
  }

  private async handleSubscriptionUpdated(sub: Stripe.Subscription) {
    const existing = await this.prisma.subscription.findUnique({
      where: { stripeSubscriptionId: sub.id },
    });
    if (!existing) return;

    await this.prisma.subscription.update({
      where: { id: existing.id },
      data: {
        stripePriceId: sub.items.data[0].price.id,
        status: sub.status,
        currentPeriodStart: new Date(sub.current_period_start * 1000),
        currentPeriodEnd: new Date(sub.current_period_end * 1000),
        cancelAtPeriodEnd: sub.cancel_at_period_end,
      },
    });
  }

  private async handleSubscriptionDeleted(sub: Stripe.Subscription) {
    const existing = await this.prisma.subscription.findUnique({
      where: { stripeSubscriptionId: sub.id },
    });
    if (!existing) return;

    await this.prisma.$transaction([
      this.prisma.subscription.update({
        where: { id: existing.id },
        data: { status: 'canceled' },
      }),
      this.prisma.creditBalance.update({
        where: { userId: existing.userId },
        data: { subscriptionCredits: 0 },
      }),
      this.prisma.user.update({
        where: { id: existing.userId },
        data: { tier: 'observer' },
      }),
    ]);
  }

  @Post('clerk')
  async handleClerkWebhook(
    @Req() req: RawBodyRequest<Request>,
    @Res() res: Response,
    @Headers('svix-id') svixId: string,
    @Headers('svix-timestamp') svixTimestamp: string,
    @Headers('svix-signature') svixSignature: string,
  ) {
    const secret = this.config.get('CLERK_WEBHOOK_SECRET');
    const wh = new Webhook(secret);

    let payload: any;
    try {
      payload = wh.verify(req.rawBody!.toString(), {
        'svix-id': svixId,
        'svix-timestamp': svixTimestamp,
        'svix-signature': svixSignature,
      });
    } catch (err) {
      this.logger.error(`Clerk webhook verification failed: ${err.message}`);
      return res.status(400).send('Invalid webhook signature');
    }

    try {
      if (payload.type === 'user.created') {
        const { id: clerkId, email_addresses } = payload.data;
        const email = email_addresses?.[0]?.email_address;
        if (!email) return res.status(200).json({ received: true });

        const user = await this.prisma.user.create({
          data: { clerkId, email },
        });

        await this.prisma.creditBalance.create({
          data: {
            userId: user.id,
            subscriptionCredits: 0,
            purchasedCredits: 0,
            resetDate: new Date(),
          },
        });

        // Check waitlist for early access bonus
        const waitlistEntry = await this.prisma.waitlist.findUnique({
          where: { email },
        });

        if (waitlistEntry) {
          await this.creditsService.addPurchasedCredits(
            user.id,
            100,
            'Waitlist early access bonus (100 credits)',
          );
        }
      }
    } catch (err) {
      this.logger.error(`Error processing Clerk webhook: ${err.message}`);
    }

    return res.status(200).json({ received: true });
  }
}
