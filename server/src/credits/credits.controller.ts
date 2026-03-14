import { Controller, Get, Req, UseGuards, Query } from '@nestjs/common';
import { CreditsService } from './credits.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('credits')
@UseGuards(AuthGuard)
export class CreditsController {
  constructor(private readonly creditsService: CreditsService) {}

  @Get('balance')
  async getBalance(@Req() req) {
    return this.creditsService.getBalance(req.userId);
  }

  @Get('transactions')
  async getTransactions(
    @Req() req,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.creditsService.getTransactions(
      req.userId,
      page ? parseInt(page, 10) : 1,
      limit ? parseInt(limit, 10) : 20,
    );
  }

  @Get('usage-summary')
  async getUsageSummary(@Req() req) {
    return this.creditsService.getUsageSummary(req.userId);
  }
}
