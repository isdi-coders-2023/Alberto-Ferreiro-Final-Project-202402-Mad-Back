import { Module } from '@nestjs/common';
import { PoliciesService } from './policies.service';
import { PoliciesController } from './policies.controller';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';
import { CoreModule } from '../core/core.module';

@Module({
  controllers: [PoliciesController],
  providers: [PoliciesService, PrismaService],
  imports: [PrismaModule, CoreModule],
})
export class PoliciesModule {}
