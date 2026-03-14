import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { WaitlistModule } from './waitlist/waitlist.module';
import { BillingModule } from './billing/billing.module';
import { CreditsModule } from './credits/credits.module';
import { AuthModule } from './auth/auth.module';
import { WebhooksModule } from './webhooks/webhooks.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    WaitlistModule,
    BillingModule,
    CreditsModule,
    AuthModule,
    WebhooksModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
