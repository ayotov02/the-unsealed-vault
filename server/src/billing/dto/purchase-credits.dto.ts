import { IsString, IsOptional } from 'class-validator';

export class PurchaseCreditsDto {
  @IsString()
  packId: string;

  @IsOptional()
  @IsString()
  successUrl?: string;

  @IsOptional()
  @IsString()
  cancelUrl?: string;
}
