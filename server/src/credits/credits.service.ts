import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export const CREDIT_COSTS: Record<string, number> = {
  chat: 5,
  debunk_text: 10,
  image_analysis: 15,
  video_analysis: 25,
  pdf_export: 3,
};

@Injectable()
export class CreditsService {
  constructor(private prisma: PrismaService) {}

  async getBalance(userId: string) {
    const balance = await this.prisma.creditBalance.findUnique({
      where: { userId },
    });

    if (!balance) {
      return {
        subscriptionCredits: 0,
        purchasedCredits: 0,
        total: 0,
        resetDate: null,
      };
    }

    return {
      subscriptionCredits: balance.subscriptionCredits,
      purchasedCredits: balance.purchasedCredits,
      total: balance.subscriptionCredits + balance.purchasedCredits,
      resetDate: balance.resetDate,
    };
  }

  async deductCredits(userId: string, amount: number, description: string) {
    const balance = await this.prisma.creditBalance.findUnique({
      where: { userId },
    });

    if (!balance) {
      throw new BadRequestException('No credit balance found');
    }

    const total = balance.subscriptionCredits + balance.purchasedCredits;
    if (total < amount) {
      throw new BadRequestException('Insufficient credits');
    }

    let subDeduct = 0;
    let purchDeduct = 0;

    if (balance.subscriptionCredits >= amount) {
      subDeduct = amount;
    } else {
      subDeduct = balance.subscriptionCredits;
      purchDeduct = amount - subDeduct;
    }

    const newSubCredits = balance.subscriptionCredits - subDeduct;
    const newPurchCredits = balance.purchasedCredits - purchDeduct;
    const newTotal = newSubCredits + newPurchCredits;

    await this.prisma.$transaction([
      this.prisma.creditBalance.update({
        where: { userId },
        data: {
          subscriptionCredits: newSubCredits,
          purchasedCredits: newPurchCredits,
        },
      }),
      this.prisma.creditTransaction.create({
        data: {
          userId,
          type: 'usage',
          amount: -amount,
          description,
          balanceAfter: newTotal,
          source: subDeduct > 0 && purchDeduct > 0 ? 'mixed' : subDeduct > 0 ? 'subscription' : 'purchased',
        },
      }),
    ]);

    return { remaining: newTotal };
  }

  async grantSubscriptionCredits(userId: string, amount: number, resetDate: Date) {
    const balance = await this.prisma.creditBalance.upsert({
      where: { userId },
      create: {
        userId,
        subscriptionCredits: amount,
        purchasedCredits: 0,
        resetDate,
      },
      update: {
        subscriptionCredits: amount,
        resetDate,
      },
    });

    const total = balance.subscriptionCredits + balance.purchasedCredits;

    await this.prisma.creditTransaction.create({
      data: {
        userId,
        type: 'subscription_grant',
        amount,
        description: `Monthly subscription credit grant (${amount} credits)`,
        balanceAfter: total,
        source: 'subscription',
      },
    });

    return balance;
  }

  async addPurchasedCredits(userId: string, amount: number, description: string) {
    const balance = await this.prisma.creditBalance.upsert({
      where: { userId },
      create: {
        userId,
        subscriptionCredits: 0,
        purchasedCredits: amount,
        resetDate: new Date(),
      },
      update: {
        purchasedCredits: { increment: amount },
      },
    });

    const total = balance.subscriptionCredits + balance.purchasedCredits;

    await this.prisma.creditTransaction.create({
      data: {
        userId,
        type: 'purchase',
        amount,
        description,
        balanceAfter: total,
        source: 'purchased',
      },
    });

    return balance;
  }

  async getTransactions(userId: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;

    const [transactions, total] = await this.prisma.$transaction([
      this.prisma.creditTransaction.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.creditTransaction.count({ where: { userId } }),
    ]);

    return {
      transactions,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getUsageSummary(userId: string) {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const transactions = await this.prisma.creditTransaction.findMany({
      where: {
        userId,
        type: 'usage',
        createdAt: { gte: thirtyDaysAgo },
      },
    });

    const breakdown: Record<string, { count: number; credits: number }> = {};
    for (const tx of transactions) {
      const key = tx.description;
      if (!breakdown[key]) {
        breakdown[key] = { count: 0, credits: 0 };
      }
      breakdown[key].count += 1;
      breakdown[key].credits += Math.abs(tx.amount);
    }

    return {
      period: '30d',
      totalUsed: transactions.reduce((sum, tx) => sum + Math.abs(tx.amount), 0),
      breakdown,
    };
  }
}
