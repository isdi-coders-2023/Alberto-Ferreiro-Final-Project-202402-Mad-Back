import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateClaimDto {
  @IsString()
  @IsOptional()
  status: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
