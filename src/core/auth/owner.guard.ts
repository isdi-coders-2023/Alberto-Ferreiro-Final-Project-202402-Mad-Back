import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PoliciesService } from '../../policies/policies.service';

@Injectable()
export class PolicyOwnerGuard implements CanActivate {
  constructor(private readonly policiesService: PoliciesService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const policyId = request.params.id;

    const policy = await this.policiesService.findOne(policyId);
    if (!policy) {
      throw new NotFoundException(`Policy not found`);
    }

    if (policy.userId !== user.id) {
      throw new ForbiddenException('Access Denied');
    }

    return true;
  }
}
