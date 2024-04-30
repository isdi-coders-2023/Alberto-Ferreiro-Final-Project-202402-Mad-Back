import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';
import { SignUser } from 'src/users/entities/user.entity';

export type TokenPayload = {
  email: string;
};

@Injectable()
export class CryptoService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async hash(value: string) {
    return hash(value, 5);
  }

  async compare(value: string, hash: string) {
    return compare(value, hash);
  }

  async createToken({ email }: SignUser) {
    const payload: TokenPayload = { email };
    const token = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('SECRET_JWT'),
    });
    return token;
  }

  async verifyToken(token: string) {
    return this.jwtService.verifyAsync<TokenPayload>(token, {
      secret: this.configService.get('SECRET_JWT'),
    });
  }
}
