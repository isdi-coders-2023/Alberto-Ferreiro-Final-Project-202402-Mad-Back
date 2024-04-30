import { Module } from '@nestjs/common';
import { CryptoService } from './crypto/crypto.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [JwtModule, ConfigModule],
  providers: [CryptoService],
  exports: [CryptoService],
})
export class CoreModule {}
