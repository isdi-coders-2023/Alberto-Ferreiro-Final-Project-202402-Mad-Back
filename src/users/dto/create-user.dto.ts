import { IsEmail, IsInt, IsString, Min } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;
  @IsString()
  @IsEmail()
  email: string;
  @IsInt()
  @Min(0)
  age: number;
  @IsInt()
  @Min(1950)
  licenseYear: number;
  @IsString()
  password: string;
}
