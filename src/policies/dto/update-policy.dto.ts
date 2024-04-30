import { PartialType } from '@nestjs/mapped-types';
import { CreatePolicyDto } from './create-policy.dto';

export class UpdatePolicyDto extends PartialType(CreatePolicyDto) {
  carMake?: string;
  carModel?: string;
  carAge?: number;
  plateNumber?: string;
  policyType: string;
}
