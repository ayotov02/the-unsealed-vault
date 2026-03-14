import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { StripeService } from './stripe.service';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { PurchaseCreditsDto } from './dto/purchase-credits.dto';

@Injectable()
export class BillingService {
  constructor(
    private prisma: PrismaService,
    private stripeService: StripeService,
  ) {}

  async createCheckout(userId: string, dto: CreateCheckoutDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { subscription: true },
    });

    if (!user) throw new NotFoundException('User not found');

    let customerId = user.stripeCustomerId;
    if (!customerId) {
      const customer = await this.stripeService.createCustomer(user.email);
      customerId = customer.id;
      await this.prisma.user.update({
        where: { id: userId },
        data: { stripeCustomerId: customerId },
      });
    }

    // Check for early access via waitlist
    const waitlistEntry = await this.prisma.waitlist.findUnique({
      where: { email: user.email },
    });

    const priceId = this.stripeService.getPriceIdForTier(dto.tier);
    const session = await this.stripeService.createCheckoutSession({
      customerId,
      priceId,
      successUrl: dto.successUrl || `${process.env.FRONTEND_URL}/settings?tab=billing&success=true`,
      cancelUrl: dto.cancelUrl || `${process.env.FRONTEND_URL}/pricing`,
      earlyAccess: waitlistEntry?.earlyAccess || false,
      metadata: { userId, tier: dto.tier },
    });

    return { url: session.url };
  }

  async createCreditCheckout(userId: string, dto: PurchaseCreditsDto) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const pack = await this.prisma.creditPack.findUnique({ where: { id: dto.packId } });
    if (!pack || !pack.active) throw new BadRequestException('Invalid credit pack');

    let customerId = user.stripeCustomerId;
    if (!customerId) {
      const customer = await this.stripeService.createCustomer(user.email);
      customerId = customer.id;
      await this.prisma.user.update({
        where: { id: userId },
        data: { stripeCustomerId: customerId },
      });
    }

    const session = await this.stripeService.createCreditCheckoutSession({
      customerId,
      priceId: pack.stripePriceId,
      successUrl: dto.successUrl || `${process.env.FRONTEND_URL}/settings?tab=credits&success=true`,
      cancelUrl: dto.cancelUrl || `${process.env.FRONTEND_URL}/settings?tab=credits`,
      metadata: { userId, packId: pack.id, credits: String(pack.credits) },
    });

    return { url: session.url };
  }

  async createPortalSession(userId: string, returnUrl?: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user?.stripeCustomerId) throw new BadRequestException('No billing account found');

    const session = await this.stripeService.createPortalSession(
      user.stripeCustomerId,
      returnUrl || `${process.env.FRONTEND_URL}/settings?tab=billing`,
    );

    return { url: session.url };
  }

  async getSubscription(userId: string) {
    const subscription = await this.prisma.subscription.findUnique({
      where: { userId },
    });

    if (!subscription) return null;

    return {
      id: subscription.id,
      status: subscription.status,
      tier: subscription.stripePriceId,
      currentPeriodEnd: subscription.currentPeriodEnd,
      cancelAtPeriodEnd: subscription.cancelAtPeriodEnd,
    };
  }
}
