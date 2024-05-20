import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { ClaimsService } from './claims.service';
import { CreateClaimDto } from './dto/create-claim.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig, multerOptions } from '../middleware/multer.middleware';
import { LoggedGuard } from '../core/auth/logged.guard';

@Controller('claims')
export class ClaimsController {
  constructor(private readonly claimsService: ClaimsService) {}

  @UseGuards(LoggedGuard)
  @Post('policy/:policyId')
  @UseInterceptors(
    FileInterceptor('image', { ...multerConfig, ...multerOptions }),
  )
  async createClaim(
    @Param('policyId') policyId: string,
    @Body() createClaimDto: CreateClaimDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.claimsService.createClaim(policyId, createClaimDto, file);
  }

  @UseGuards(LoggedGuard)
  @Get('policy/:policyId')
  async getClaimsByPolicyId(@Param('policyId') policyId: string) {
    return this.claimsService.findByPolicyId(policyId);
  }
}
