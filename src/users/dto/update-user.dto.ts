import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsOptional()
  name?: string;
  @IsString()
  @IsEmail()
  @IsOptional()
  email?: string;
  @IsOptional()
  age?: number;
  @IsOptional()
  licenseYear?: number;
  @IsOptional()
  @IsString()
  password?: string;
  @IsOptional()
  @IsString()
  bankAccount?: string;
}
