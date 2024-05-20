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
    transform: true,
  }),
)
@Controller('policies')
export class PoliciesController {
  constructor(private readonly policiesService: PoliciesService) {}
  @UseGuards(LoggedGuard)
  @Post('create')
  create(@Body() data: CreatePolicyDto) {
    const userId = data.userId;
    return this.policiesService.create(userId, data);
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
  @Get('user/:userId')
  findByUserId(@Param('userId') userId: string) {
    return this.policiesService.findByUserId(userId);
  }

  @UseGuards(PolicyOwnerGuard)
  @UseGuards(LoggedGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePolicyDto: UpdatePolicyDto) {
    return this.policiesService.update(id, updatePolicyDto);
  }
  @UseGuards(PolicyOwnerGuard)
  @UseGuards(LoggedGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.policiesService.delete(id);
  }
}
