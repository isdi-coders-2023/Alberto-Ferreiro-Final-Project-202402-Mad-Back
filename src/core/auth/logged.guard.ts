import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CryptoService } from '../crypto/crypto.service';

@Injectable()
export class LoggedGuard implements CanActivate {
  constructor(private readonly cryptoService: CryptoService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const auth = request.headers.authorization;

    if (!auth) {
      throw new ForbiddenException('Authorization header is required');
    }
    const token = auth.split(' ')[1];

    try {
      const decodedToken = await this.cryptoService.verifyToken(token);

      request.payload = decodedToken;
      return true;
    } catch (error) {
      throw new ForbiddenException('Invalid token');
    }
  }
}
