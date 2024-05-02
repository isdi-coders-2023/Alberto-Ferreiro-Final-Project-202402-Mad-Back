import { Test, TestingModule } from '@nestjs/testing';
import { PoliciesController } from './policies.controller';
import { PoliciesService } from './policies.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePolicyDto } from './dto/create-policy.dto';
import { CryptoService } from '../core/crypto/crypto.service';

const mockPoliciesService = {
  findAll: jest.fn().mockResolvedValue([]),
  findOne: jest.fn().mockResolvedValue({}),
  create: jest.fn().mockResolvedValue({}),
  update: jest.fn().mockResolvedValue({}),
  delete: jest.fn().mockResolvedValue({}),
};

const mockPrismaService = {
  policy: {
    findMany: jest.fn().mockResolvedValue([]),
    findUnique: jest.fn().mockReturnValue({}),
    create: jest.fn().mockReturnValue({}),
    update: jest.fn().mockReturnValue({}),
  },
};

const fakeCryptoAssistant = {
  hash: jest.fn().mockResolvedValue('somehashedthing'),
  compare: jest.fn().mockResolvedValue(true),
  createToken: jest.fn().mockResolvedValue('stuff'),
};

describe('PoliciesController', () => {
  let controller: PoliciesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PoliciesController],
      providers: [
        PoliciesService,
        {
          provide: PoliciesService,
          useValue: mockPoliciesService,
        },
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        {
          provide: CryptoService,
          useValue: fakeCryptoAssistant,
        },
      ],
    }).compile();

    controller = module.get<PoliciesController>(PoliciesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('When we use the method findAll', () => {
    it('should return all users', async () => {
      const result = await controller.findAll();
      expect(mockPoliciesService.findAll).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });
  describe('When we use the method findOne', () => {
    it('should return the user with the id', async () => {
      const result = await controller.findOne('1');
      expect(mockPoliciesService.findOne).toHaveBeenCalled();
      expect(result).toEqual({});
    });
  });
  describe('When we use the method create', () => {
    it('should create a new policy', async () => {
      const mockPolicyDto = {} as CreatePolicyDto;
      const result = await controller.create('1', mockPolicyDto);
      expect(mockPoliciesService.create).toHaveBeenCalled();
      expect(result).toEqual({});
    });
  });
  describe('When we use the method update', () => {
    it('should update a policy', async () => {
      const mockPolicyDto = {
        policyType: '12345',
      } as CreatePolicyDto;
      const result = await controller.update('1', mockPolicyDto);
      expect(mockPoliciesService.update).toHaveBeenCalled();
      expect(result).toEqual({});
    });
  });
  describe('When we use the method delete', () => {
    it('should delete and return a policy', async () => {
      const result = await controller.delete('1');
      expect(mockPoliciesService.delete).toHaveBeenCalled();
      expect(result).toEqual({});
    });
  });
});
