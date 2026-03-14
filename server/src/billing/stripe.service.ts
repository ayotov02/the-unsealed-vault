import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

const TIER_PRICE_MAP: Record<string, string> = {
  observer: process.env.STRIPE_PRICE_OBSERVER || 'price_observer_mo',
  investigator: process.env.STRIPE_PRICE_INVESTIGATOR || 'price_investigator_mo',
  archivist: process.env.STRIPE_PRICE_ARCHIVIST || 'price_archivist_mo',
};

const TIER_CREDITS: Record<string, number> = {
  observer: 200,
  investigator: 750,
  archivist: 2500,
};

const EARLY_ACCESS_COUPON = 'EARLY_ACCESS_30';

@Injectable()
export class StripeService {
  public stripe: Stripe;

  constructor(private config: ConfigService) {
    this.stripe = new Stripe(this.config.get('STRIPE_SECRET_KEY')!, {
      apiVersion: '2025-02-24.acacia',
    });
  }

  getPriceIdForTier(tier: string): string {
    return TIER_PRICE_MAP[tier];
  }

  getCreditsForTier(tier: string): number {
    return TIER_CREDITS[tier] || 0;
  }

  async createCustomer(email: string): Promise<Stripe.Customer> {
    return this.stripe.customers.create({ email });
  }

  async createCheckoutSession(params: {
    customerId: string;
    priceId: string;
    successUrl: string;
    cancelUrl: string;
    earlyAccess?: boolean;
    metadata?: Record<string, string>;
  }): Promise<Stripe.Checkout.Session> {
    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      customer: params.customerId,
      mode: 'subscription',
      line_items: [{ price: params.priceId, quantity: 1 }],
      success_url: params.successUrl,
      cancel_url: params.cancelUrl,
      metadata: params.metadata,
    };

    if (params.earlyAccess) {
      sessionParams.discounts = [{ coupon: EARLY_ACCESS_COUPON }];
    }

    return this.stripe.checkout.sessions.create(sessionParams);
  }

  async createCreditCheckoutSession(params: {
    customerId: string;
    priceId: string;
    successUrl: string;
    cancelUrl: string;
    metadata?: Record<string, string>;
  }): Promise<Stripe.Checkout.Session> {
    return this.stripe.checkout.sessions.create({
      customer: params.customerId,
      mode: 'payment',
      line_items: [{ price: params.priceId, quantity: 1 }],
      success_url: params.successUrl,
      cancel_url: params.cancelUrl,
      metadata: params.metadata,
    });
  }

  async createPortalSession(customerId: string, returnUrl: string): Promise<Stripe.BillingPortal.Session> {
    return this.stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    });
  }

  constructWebhookEvent(body: Buffer, signature: string): Stripe.Event {
    return this.stripe.webhooks.constructEvent(
      body,
      signature,
      this.config.get('STRIPE_WEBHOOK_SECRET')!,
    );
  }
}
