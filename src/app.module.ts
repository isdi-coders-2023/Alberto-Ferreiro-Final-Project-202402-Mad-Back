import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PoliciesModule } from './policies/policies.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { CoreModule } from './core/core.module';
import { ClaimsModule } from './claims/claims.module';

@Module({
  imports: [
    UsersModule,
    PoliciesModule,
    PrismaModule,
    CoreModule,
    ClaimsModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
