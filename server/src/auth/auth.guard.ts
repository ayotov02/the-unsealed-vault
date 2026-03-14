import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { verifyToken } from '@clerk/backend';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private config: ConfigService,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing authorization header');
    }

    const token = authHeader.substring(7);

    try {
      const payload = await verifyToken(token, {
        secretKey: this.config.get('CLERK_SECRET_KEY'),
      });

      const clerkId = payload.sub;
      const user = await this.prisma.user.findUnique({
        where: { clerkId },
      });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      request.userId = user.id;
      request.clerkId = clerkId;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
