import { IsEmail, IsIn, IsOptional, IsString } from 'class-validator';

export class JoinWaitlistDto {
  @IsEmail()
  email: string;

  @IsIn(['observer', 'investigator', 'archivist'])
  selectedTier: string;

  @IsOptional()
  @IsString()
  referredBy?: string;
}
