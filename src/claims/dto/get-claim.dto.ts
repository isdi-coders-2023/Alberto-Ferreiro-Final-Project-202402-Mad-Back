import { IsString, IsNotEmpty } from 'class-validator';

export class GetClaimsDto {
  @IsString()
  @IsNotEmpty()
  policyId: string;
}
