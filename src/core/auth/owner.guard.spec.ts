import { Test, TestingModule } from '@nestjs/testing';
import {
  ExecutionContext,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { PolicyOwnerGuard } from './owner.guard';
import { PoliciesService } from '../../policies/policies.service';

describe('PolicyOwnerGuard', () => {
  let guard: PolicyOwnerGuard;
  let policiesService: PoliciesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PolicyOwnerGuard,
        { provide: PoliciesService, useValue: { findOne: jest.fn() } },
      ],
    }).compile();

    guard = module.get<PolicyOwnerGuard>(PolicyOwnerGuard);
    policiesService = module.get<PoliciesService>(PoliciesService);
  });

  it('should allow access if the user is the owner of the policy', async () => {
    const request = {
      user: { id: 'user1' },
      params: { id: 'policy1' },
    };
    const policy = {
      id: 'policy1',
      userId: 'user1',
      carMake: 'CarBrand',
      carModel: 'ModelX',
      carAge: 5,
      plateNumber: 'XYZ1234',
      policyNumber: 101,
      claims: [],
    };

    jest.spyOn(policiesService, 'findOne').mockResolvedValue(policy);
    const context = {
      switchToHttp: () => ({ getRequest: () => request }),
    } as unknown as ExecutionContext;

    await expect(guard.canActivate(context)).resolves.toBeTruthy();
  });

  it('should throw a ForbiddenException if the user is not the owner of the policy', async () => {
    const request = {
      user: { id: 'user2' },
      params: { id: 'policy1' },
    };
    const policy = {
      id: 'policy1',
      userId: 'user1',
      carMake: 'CarBrand',
      carModel: 'ModelX',
      carAge: 5,
      plateNumber: 'XYZ1234',
      policyNumber: 101,
      claims: [],
    };

    jest.spyOn(policiesService, 'findOne').mockResolvedValue(policy);
    const context = {
      switchToHttp: () => ({ getRequest: () => request }),
    } as unknown as ExecutionContext;

    await expect(guard.canActivate(context)).rejects.toThrow(
      ForbiddenException,
    );
  });

  it('should throw a NotFoundException if the policy does not exist', async () => {
    const request = {
      user: { id: 'user1' },
      params: { id: 'policy1' },
    };

    jest.spyOn(policiesService, 'findOne').mockResolvedValue(null as any);
    const context = {
      switchToHttp: () => ({ getRequest: () => request }),
    } as unknown as ExecutionContext;

    await expect(guard.canActivate(context)).rejects.toThrow(NotFoundException);
  });
});
