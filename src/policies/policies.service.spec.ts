import { Test, TestingModule } from '@nestjs/testing';
import { PoliciesService } from './policies.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePolicyDto } from './dto/create-policy.dto';
import { UpdatePolicyDto } from './dto/update-policy.dto';

const mockPrisma = {
  policy: {
    findMany: jest.fn().mockResolvedValue([]),
    findUnique: jest.fn().mockReturnValue({}),
    create: jest.fn().mockReturnValue({}),
    update: jest.fn().mockReturnValue({}),
    delete: jest.fn().mockReturnValue({}),
  },
};

describe('PoliciesService', () => {
  let service: PoliciesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: PrismaService, useValue: mockPrisma },
        PoliciesService,
      ],
    }).compile();

    service = module.get<PoliciesService>(PoliciesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('When we use the method findOne', () => {
    it('Then it should return the user with the right id', async () => {
      const result = await service.findOne('1');
      expect(mockPrisma.policy.findUnique).toHaveBeenCalled();
      expect(result).toEqual({});
    });

    it('Then it should throw an error if the user is not found', async () => {
      mockPrisma.policy.findUnique.mockReturnValueOnce(null);
      expect(service.findOne('1')).rejects.toThrow('Policy 1 not found');
    });
  });
  describe('When we use the method findAll', () => {
    it('Then it should return all the users', async () => {
      const result = await service.findAll();
      expect(mockPrisma.policy.findMany).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });
  describe('When we use the method create', () => {
    it('Then it should return the new user', async () => {
      const result = await service.create('1', {} as CreatePolicyDto);
      expect(mockPrisma.policy.create).toHaveBeenCalled();

      expect(result).toEqual({});
    });
  });
  describe('When we use the method update', () => {
    it('Then it should return the updated user', async () => {
      const result = await service.update('1', {} as UpdatePolicyDto);
      expect(mockPrisma.policy.update).toHaveBeenCalled();
      expect(result).toEqual({});
    });

    it('Then it should throw an error if the user is not found', async () => {
      mockPrisma.policy.findUnique.mockReturnValueOnce(null);
      mockPrisma.policy.update.mockRejectedValueOnce(
        new Error('Policy not found'),
      );
      expect(service.update('1', {} as UpdatePolicyDto)).rejects.toThrow(
        'Policy 1 not found',
      );
    });
  });
  describe('When we use the method delete', () => {
    it('Then it should return the deleted user', async () => {
      mockPrisma.policy.findUnique.mockReturnValueOnce({});
      mockPrisma.policy.delete.mockReturnValueOnce({});
      const result = await service.delete('1');
      expect(mockPrisma.policy.delete).toHaveBeenCalled();
      expect(result).toEqual({});
    });

    it('Then it should throw an error if the user is not found', async () => {
      mockPrisma.policy.findUnique.mockReturnValueOnce(null);
      mockPrisma.policy.delete.mockRejectedValueOnce(
        new Error('Policy not found'),
      );
      expect(service.delete('2')).rejects.toThrow('Policy 2 not found');
    });
  });
});
