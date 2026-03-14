import { IsIn, IsOptional, IsString } from 'class-validator';

export class CreateCheckoutDto {
  @IsIn(['observer', 'investigator', 'archivist'])
  tier: string;

  @IsOptional()
  @IsString()
  successUrl?: string;

  @IsOptional()
  @IsString()
  cancelUrl?: string;
}
