import { Module } from '@nestjs/common';
import { WebhooksController } from './webhooks.controller';
import { BillingModule } from '../billing/billing.module';
import { CreditsModule } from '../credits/credits.module';

@Module({
  imports: [BillingModule, CreditsModule],
  controllers: [WebhooksController],
})
export class WebhooksModule {}
