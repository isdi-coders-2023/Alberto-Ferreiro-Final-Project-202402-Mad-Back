export class Policy {
  id: string;
  userId: string;
  carMake: string;
  carModel: string;
  carAge: number;
  plateNumber: string;
  policyNumber: number;
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
