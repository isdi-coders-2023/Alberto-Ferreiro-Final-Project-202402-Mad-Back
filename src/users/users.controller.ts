import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  BadRequestException,
  ForbiddenException,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CryptoService } from '../core/crypto/crypto.service';
import { SignUser } from './entities/user.entity';
import { LoggedGuard } from '../core/auth/logged.guard';

@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly crypto: CryptoService,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    createUserDto.password = await this.crypto.hash(createUserDto.password);
    return this.usersService.create(createUserDto);
  }

  @Post('login')
  async login(@Body() data: SignUser) {
    const { email, password } = data;
    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }

    const user = await this.usersService.findForLogin(email);

    if (!user) {
      throw new ForbiddenException('Email and password invalid');
    }

    if (!(await this.crypto.compare(password, user.password!))) {
      throw new ForbiddenException('Email and password invalid2');
    }

    return { token: await this.crypto.createToken(user) };
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
  @UseGuards(LoggedGuard)
  @Get(':id/details')
  findOneWithBankAccount(@Param('id') id: string) {
    return this.usersService.findOneWithBankAccount(id);
  }

  @UseGuards(LoggedGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }
}
