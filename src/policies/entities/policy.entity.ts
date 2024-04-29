export class Policy {
  id: string;
  userId: number;
  carMake: string;
  carModel: string;
  carAge: string;
  plateNumber: string;
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
