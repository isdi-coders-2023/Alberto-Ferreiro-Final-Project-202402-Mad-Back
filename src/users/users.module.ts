import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CoreModule } from 'src/core/core.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
  imports: [PrismaModule, CoreModule],
})
export class UsersModule {}
