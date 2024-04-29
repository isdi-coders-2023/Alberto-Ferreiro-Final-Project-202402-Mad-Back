import { Policy } from 'src/policies/entities/policy.entity';

export class User {
  id: string;
  name: string;
  password: string;
  age: number;
  licenseYear: number;
  bankAccount: string;
  policies: Policy[];
}
