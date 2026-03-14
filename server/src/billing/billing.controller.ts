import { Controller, Post, Get, Body, Req, UseGuards } from '@nestjs/common';
import { BillingService } from './billing.service';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { PurchaseCreditsDto } from './dto/purchase-credits.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('billing')
@UseGuards(AuthGuard)
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Post('create-checkout')
  async createCheckout(@Req() req, @Body() dto: CreateCheckoutDto) {
    return this.billingService.createCheckout(req.userId, dto);
  }

  @Post('create-credit-checkout')
  async createCreditCheckout(@Req() req, @Body() dto: PurchaseCreditsDto) {
    return this.billingService.createCreditCheckout(req.userId, dto);
  }

  @Post('portal')
  async createPortal(@Req() req, @Body() body: { returnUrl?: string }) {
    return this.billingService.createPortalSession(req.userId, body.returnUrl);
  }

  @Get('subscription')
  async getSubscription(@Req() req) {
    return this.billingService.getSubscription(req.userId);
  }
}
