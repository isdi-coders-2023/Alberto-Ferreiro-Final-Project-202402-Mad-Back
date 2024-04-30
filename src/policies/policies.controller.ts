import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PoliciesService } from './policies.service';
import { CreatePolicyDto } from './dto/create-policy.dto';
import { UpdatePolicyDto } from './dto/update-policy.dto';

@Controller('policies')
export class PoliciesController {
  constructor(private readonly policiesService: PoliciesService) {}

  @Post()
  create(@Param('id') id: string, @Body() createPolicyDto: CreatePolicyDto) {
    return this.policiesService.create(id, createPolicyDto);
  }

  @Get()
  findAll() {
    return this.policiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.policiesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePolicyDto: UpdatePolicyDto) {
    return this.policiesService.update(id, updatePolicyDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.policiesService.delete(id);
  }
}
