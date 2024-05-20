import { Module } from '@nestjs/common';
import { ClaimsService } from './claims.service';
import { ClaimsController } from './claims.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CoreModule } from 'src/core/core.module';

@Module({
  controllers: [ClaimsController],
  providers: [ClaimsService, PrismaService],
  imports: [PrismaModule, CoreModule],
})
export class ClaimsModule {}
