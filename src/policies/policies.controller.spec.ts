import { Test, TestingModule } from '@nestjs/testing';
import { PoliciesController } from './policies.controller';
import { PoliciesService } from './policies.service';
import { CryptoService } from '../core/crypto/crypto.service';
import { CreatePolicyDto } from './dto/create-policy.dto';
import { UpdatePolicyDto } from './dto/update-policy.dto';
import { LoggedGuard } from '../core/auth/logged.guard';
import { PolicyOwnerGuard } from '../core/auth/owner.guard';

const mockPoliciesService = {
  findAll: jest.fn().mockResolvedValue([]),
  findOne: jest.fn().mockResolvedValue({}),
  create: jest.fn().mockResolvedValue({}),
  update: jest.fn().mockResolvedValue({}),
  delete: jest.fn().mockResolvedValue({}),
  findByUserId: jest.fn().mockResolvedValue([]),
};

const mockCryptoService = {
  verifyToken: jest.fn().mockResolvedValue(true),
};

describe('PoliciesController', () => {
  let controller: PoliciesController;
  let service: PoliciesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PoliciesController],
      providers: [
        { provide: PoliciesService, useValue: mockPoliciesService },
        { provide: CryptoService, useValue: mockCryptoService },
        LoggedGuard,
        PolicyOwnerGuard,
      ],
    }).compile();

    controller = module.get<PoliciesController>(PoliciesController);
    service = module.get<PoliciesService>(PoliciesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of policies', async () => {
      const result = await controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a single policy', async () => {
      const result = await controller.findOne('1');
      expect(service.findOne).toHaveBeenCalledWith('1');
      expect(result).toEqual({});
    });
  });

  describe('findByUserId', () => {
    it('should return policies for a specific user', async () => {
      const result = await controller.findByUserId('user1');
      expect(service.findByUserId).toHaveBeenCalledWith('user1');
      expect(result).toEqual([]);
    });
  });

  describe('create', () => {
    it('should create a new policy', async () => {
      const mockPolicyDto: CreatePolicyDto = {
        policyType: 'auto',
        carMake: 'Toyota',
        carModel: 'Corolla',
        carAge: 5,
        plateNumber: 'XYZ123',
        userId: 'user1',
      };
      const result = await controller.create(mockPolicyDto);
      expect(service.create).toHaveBeenCalledWith('user1', mockPolicyDto);
      expect(result).toEqual({});
    });
  });

  describe('update', () => {
    it('should update a policy', async () => {
      const mockUpdatePolicyDto: UpdatePolicyDto = {
        policyType: 'home',
      };
      const result = await controller.update('1', mockUpdatePolicyDto);
      expect(service.update).toHaveBeenCalledWith('1', mockUpdatePolicyDto);
      expect(result).toEqual({});
    });
  });

  describe('delete', () => {
    it('should delete a policy', async () => {
      const result = await controller.delete('1');
      expect(service.delete).toHaveBeenCalledWith('1');
      expect(result).toEqual({});
    });
  });
});
