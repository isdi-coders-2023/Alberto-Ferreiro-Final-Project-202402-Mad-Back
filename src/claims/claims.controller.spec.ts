import { Test, TestingModule } from '@nestjs/testing';
import { ClaimsController } from './claims.controller';
import { ClaimsService } from './claims.service';
import { PrismaService } from '../prisma/prisma.service';
import { CryptoService } from '../core/crypto/crypto.service';
import { LoggedGuard } from '../core/auth/logged.guard';
import { CreateClaimDto } from './dto/create-claim.dto';

class Claim {
  id: string;
  policyId: string;
  operatorId: string;
  status: string;
  type: string;
  phoneNumber: string;
  address: string;
  claimNumber: number;
  imageUrl: string;
}

const mockPrismaService = {};
const mockClaimsService = {
  createClaim: jest.fn(),
  findByPolicyId: jest.fn(),
};

const mockCryptoService = {
  verifyToken: jest.fn().mockResolvedValue(true),
};

describe('ClaimsController', () => {
  let controller: ClaimsController;
  let service: ClaimsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClaimsController],
      providers: [
        { provide: ClaimsService, useValue: mockClaimsService },
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: CryptoService, useValue: mockCryptoService },
        LoggedGuard,
      ],
    }).compile();

    controller = module.get<ClaimsController>(ClaimsController);
    service = module.get<ClaimsService>(ClaimsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createClaim', () => {
    it('should create a claim and return the result', async () => {
      const createClaimDto: CreateClaimDto = {
        type: 'crash',
        phoneNumber: '1234567890',
        address: '123 Main St',
      } as any;
      const file = { originalname: 'file.png' } as any;
      const policyId = '1';
      const result: Claim = {
        id: '1',
        policyId,
        operatorId: 'randomId',
        status: 'pending',
        type: 'crash',
        phoneNumber: '1234567890',
        address: '123 Main St',
        claimNumber: 1,
        imageUrl: 'http://example.com/image.png',
      };

      jest.spyOn(service, 'createClaim').mockResolvedValue(result);

      const response = await controller.createClaim(
        policyId,
        createClaimDto,
        file,
      );

      expect(response).toBe(result);
      expect(service.createClaim).toHaveBeenCalledWith(
        policyId,
        createClaimDto,
        file,
      );
    });
  });

  describe('getClaimsByPolicyId', () => {
    it('should return claims for the given policy ID', async () => {
      const policyId = '1';
      const claims: Claim[] = [
        {
          id: '1',
          policyId,
          operatorId: 'randomId',
          status: 'pending',
          type: 'crash',
          phoneNumber: '1234567890',
          address: '123 Main St',
          claimNumber: 1,
          imageUrl: 'http://example.com/image.png',
        },
      ];

      jest.spyOn(service, 'findByPolicyId').mockResolvedValue(claims);

      const response = await controller.getClaimsByPolicyId(policyId);

      expect(response).toBe(claims);
      expect(service.findByPolicyId).toHaveBeenCalledWith(policyId);
    });
  });
});
