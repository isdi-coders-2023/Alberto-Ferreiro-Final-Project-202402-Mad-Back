export class Policy {
  id: string;
  userId: number;
  carMake: string;
  carModel: string;
  carAge: number;
  plateNumber: number;
  policyNumber: string;
  policyType: string;
  claims: Claim[];
}

export class Claim {
  id: string;
  policyId: number;
  operatorId?: number;
  status: string;
  type: string;
  phoneNumber: string;
  address: string;
}
