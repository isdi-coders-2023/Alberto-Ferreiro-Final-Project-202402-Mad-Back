import { Module } from '@nestjs/common';
import { PoliciesService } from './policies.service';
import { PoliciesController } from './policies.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [PoliciesController],
  providers: [PoliciesService, PrismaService],
  imports: [PrismaModule],
})
export class PoliciesModule {}
