import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JoinWaitlistDto } from './dto/join-waitlist.dto';

const EARLY_ACCESS_LIMIT = 500;

@Injectable()
export class WaitlistService {
  constructor(private prisma: PrismaService) {}

  async join(dto: JoinWaitlistDto) {
    const existing = await this.prisma.waitlist.findUnique({
      where: { email: dto.email },
    });

    if (existing) {
      const total = await this.prisma.waitlist.count();
      return {
        position: existing.position,
        referralCode: existing.referralCode,
        earlyAccess: existing.earlyAccess,
        totalSignups: total,
        alreadyJoined: true,
      };
    }

    // position is autoincremented by the DB — we read it back after create
    const entry = await this.prisma.waitlist.create({
      data: {
        email: dto.email,
        selectedTier: dto.selectedTier,
        referredBy: dto.referredBy || null,
      },
    });

    // Mark early access based on autoincremented position
    const earlyAccess = entry.position <= EARLY_ACCESS_LIMIT;
    if (earlyAccess) {
      await this.prisma.waitlist.update({
        where: { id: entry.id },
        data: { earlyAccess: true },
      });
    }

    const total = await this.prisma.waitlist.count();

    return {
      position: entry.position,
      referralCode: entry.referralCode,
      earlyAccess,
      totalSignups: total,
      alreadyJoined: false,
    };
  }

  async getPosition(email: string) {
    const entry = await this.prisma.waitlist.findUnique({
      where: { email },
    });

    if (!entry) {
      return null;
    }

    return {
      position: entry.position,
      referralCode: entry.referralCode,
      earlyAccess: entry.earlyAccess,
      selectedTier: entry.selectedTier,
    };
  }

  async getStats() {
    const totalSignups = await this.prisma.waitlist.count();
    const spotsRemaining = Math.max(0, EARLY_ACCESS_LIMIT - totalSignups);

    return {
      totalSignups,
      spotsRemaining,
      earlyAccessLimit: EARLY_ACCESS_LIMIT,
    };
  }
}
