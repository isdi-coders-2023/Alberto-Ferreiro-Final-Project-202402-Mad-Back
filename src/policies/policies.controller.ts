import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PoliciesService } from './policies.service';
import { CreatePolicyDto } from './dto/create-policy.dto';
import { UpdatePolicyDto } from './dto/update-policy.dto';
import { PolicyOwnerGuard } from '../core/auth/owner.guard';
import { LoggedGuard } from '../core/auth/logged.guard';

@UsePipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }),
)
@Controller('policies')
export class PoliciesController {
  constructor(private readonly policiesService: PoliciesService) {}

  @Post('create')
  create(@Param('id') id: string, @Body() createPolicyDto: CreatePolicyDto) {
    return this.policiesService.create(id, createPolicyDto);
  }
  @UseGuards(LoggedGuard)
  @Get()
  findAll() {
    return this.policiesService.findAll();
  }
  @UseGuards(LoggedGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.policiesService.findOne(id);
  }

  @UseGuards(LoggedGuard)
  @UseGuards(PolicyOwnerGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePolicyDto: UpdatePolicyDto) {
    return this.policiesService.update(id, updatePolicyDto);
  }
  @UseGuards(LoggedGuard)
  @UseGuards(PolicyOwnerGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.policiesService.delete(id);
  }
}
