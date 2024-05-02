import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePolicyDto } from './dto/create-policy.dto';
import { UpdatePolicyDto } from './dto/update-policy.dto';
import { PrismaService } from '../prisma/prisma.service';

const select = {
  id: true,
  carMake: true,
  carModel: true,
  carAge: true,
  plateNumber: true,
  policyNumber: true,
  userId: true,
  claims: {
    select: {
      status: true,
      type: true,
      phoneNumber: true,
      address: true,
    },
  },
};

@Injectable()
export class PoliciesService {
  constructor(private prisma: PrismaService) {}
  async create(id: string, data: CreatePolicyDto) {
    return this.prisma.policy.create({
      data,
      select,
    });
  }

  async findAll() {
    return this.prisma.policy.findMany({ select });
  }

  async findOne(inputId: string) {
    const policy = await this.prisma.policy.findUnique({
      where: { id: inputId },
      select,
    });
    if (!policy) {
      throw new NotFoundException(`Policy ${inputId} not found`);
    }
    return policy;
  }

  async update(inputId: string, data: UpdatePolicyDto) {
    try {
      return await this.prisma.policy.update({
        where: { id: inputId },
        data,
        select,
      });
    } catch (error) {
      throw new NotFoundException(`Policy ${inputId} not found`);
    }
  }

  async delete(inputId: string) {
    try {
      return await this.prisma.policy.delete({
        where: { id: inputId },
        select,
      });
    } catch (error) {
      throw new NotFoundException(`Policy ${inputId} not found`);
    }
  }
}
