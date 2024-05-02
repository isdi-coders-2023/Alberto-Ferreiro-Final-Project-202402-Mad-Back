import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CryptoService } from '../core/crypto/crypto.service';

const select = {
  id: true,
  email: true,
  name: true,
  policies: {
    select: {
      carMake: true,
      carModel: true,
      policyNumber: true,
      plateNumber: true,
    },
  },
};

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private crypto: CryptoService,
  ) {}
  async create(data: CreateUserDto) {
    data.password = await this.crypto.hash(data.password);
    return this.prisma.user.create({
      data,
      select,
    });
  }

  async findAll() {
    return this.prisma.user.findMany({ select });
  }

  async findOne(inputId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: inputId },
      select,
    });

    if (!user) {
      throw new NotFoundException(`User ${inputId} not found`);
    }

    return user;
  }

  async findForLogin(inputEmail: string) {
    const user = await this.prisma.user.findUnique({
      where: { email: inputEmail },
      select: {
        email: true,
        password: true,
      },
    });

    if (!user) {
      throw new ForbiddenException('Invalid input');
    }

    return user;
  }

  async update(id: string, data: UpdateUserDto) {
    try {
      return await this.prisma.user.update({
        where: { id },
        data,
        select,
      });
    } catch (error) {
      throw new NotFoundException(`User ${id} not found`);
    }
  }
}
