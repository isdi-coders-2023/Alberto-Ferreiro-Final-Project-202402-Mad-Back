import { IsString, IsEmail } from 'class-validator';
import { Policy } from 'src/policies/entities/policy.entity';

export class User {
  id: string;
  name: string;
  email: string;
  password: string;
  age: number;
  licenseYear: number;
  bankAccount: string;
  policies: Policy[];
}

export class SignUser {
  @IsString()
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}

export class LogUser {
  @IsString()
  @IsEmail()
  email: string;
  @IsString()
  id: string;
}
