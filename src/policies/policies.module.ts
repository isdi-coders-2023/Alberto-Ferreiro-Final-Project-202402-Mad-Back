import { Module } from '@nestjs/common';
import { PoliciesService } from './policies.service';
import { PoliciesController } from './policies.controller';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';
import { CoreModule } from '../core/core.module';

export const REPO_SERVICE = 'REPO_SERVICE';
@Module({
  controllers: [PoliciesController],
  providers: [
    PoliciesService,
    PrismaService,
    {
      provide: 'REPO_SERVICE',
      useClass: PoliciesService,
    },
  ],
  imports: [PrismaModule, CoreModule],
})
export class PoliciesModule {}
