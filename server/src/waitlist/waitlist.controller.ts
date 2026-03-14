import { Controller, Post, Get, Body, Query, NotFoundException } from '@nestjs/common';
import { WaitlistService } from './waitlist.service';
import { JoinWaitlistDto } from './dto/join-waitlist.dto';

@Controller('waitlist')
export class WaitlistController {
  constructor(private readonly waitlistService: WaitlistService) {}

  @Post('join')
  async join(@Body() dto: JoinWaitlistDto) {
    return this.waitlistService.join(dto);
  }

  @Get('position')
  async getPosition(@Query('email') email: string) {
    const result = await this.waitlistService.getPosition(email);
    if (!result) {
      throw new NotFoundException('Email not found on waitlist');
    }
    return result;
  }

  @Get('stats')
  async getStats() {
    return this.waitlistService.getStats();
  }
}
