import { IsInt, IsString } from 'class-validator';

export class CreatePolicyDto {
  @IsString()
  carMake: string;
  @IsString()
  carModel: string;
  @IsInt()
  carAge: number;
  @IsString()
  plateNumber: string;
  @IsString()
  policyType: string;
  @IsString()
  userId: string;
}
