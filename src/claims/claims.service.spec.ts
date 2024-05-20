import { Test, TestingModule } from '@nestjs/testing';
import { ClaimsService } from './claims.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClaimDto } from './dto/create-claim.dto';
import { NotFoundException } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

jest.mock('cloudinary');

describe('ClaimsService', () => {
  let service: ClaimsService;
  let prisma: PrismaService;

  const mockPrismaService = {
    claim: {
      create: jest.fn() as jest.MockedFunction<any>,
      findMany: jest.fn() as jest.MockedFunction<any>,
    },
  };

  const mockCloudinaryUpload = jest.fn().mockImplementation((_, callback) => {
    callback(null, { secure_url: 'http://example.com/image.png' });
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClaimsService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<ClaimsService>(ClaimsService);
    prisma = module.get<PrismaService>(PrismaService);
    cloudinary.uploader.upload_stream = mockCloudinaryUpload;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createClaim', () => {
    it('should create a claim and return the result', async () => {
      const createClaimDto: CreateClaimDto = {
        type: 'crash',
        phoneNumber: '1234567890',
        address: '123 Main St',
        status: 'open',
      };

      const file = {
        buffer: Buffer.from('file content'),
      } as Express.Multer.File;

      const result = {
        id: '1',
        policyId: '1',
        operatorId: 'randomId',
        status: 'open',
        type: 'crash',
        phoneNumber: '1234567890',
        address: '123 Main St',
        claimNumber: 1,
        imageUrl: 'http://example.com/image.png',
      };

      (prisma.claim.create as jest.MockedFunction<any>).mockResolvedValue(
        result,
      );

      const response = await service.createClaim('1', createClaimDto, file);

      expect(response).toEqual(result);
      expect(prisma.claim.create).toHaveBeenCalledWith({
        data: {
          ...createClaimDto,
          policyId: '1',
          imageUrl: 'http://example.com/image.png',
          status: 'open',
        },
      });
      expect(mockCloudinaryUpload).toHaveBeenCalled();
    });
  });

  describe('findByPolicyId', () => {
    it('should return claims for the given policy ID', async () => {
      const policyId = '1';
      const claims = [
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

      (prisma.claim.findMany as jest.MockedFunction<any>).mockResolvedValue(
        claims,
      );

      const response = await service.findByPolicyId(policyId);

      expect(response).toEqual(claims);
      expect(prisma.claim.findMany).toHaveBeenCalledWith({
        where: { policyId },
      });
    });

    it('should throw NotFoundException if no claims are found', async () => {
      const policyId = '1';
      (prisma.claim.findMany as jest.MockedFunction<any>).mockResolvedValue([]);

      await expect(service.findByPolicyId(policyId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
