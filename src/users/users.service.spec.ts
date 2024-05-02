import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CryptoService } from '../core/crypto/crypto.service';

const mockPrisma = {
  user: {
    findMany: jest.fn().mockResolvedValue([]),
    findUnique: jest.fn().mockReturnValue({}),
    create: jest.fn().mockReturnValue({}),
    update: jest.fn().mockReturnValue({}),
  },
};
const mockCryptoService = {
  hash: jest.fn().mockResolvedValue(''),
  compare: jest.fn().mockResolvedValue(''),
};
describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: PrismaService, useValue: mockPrisma },
        { provide: CryptoService, useValue: mockCryptoService },
        UsersService,
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('When we use the method findOne', () => {
    it('Then it should return the user with the right id', async () => {
      const result = await service.findOne('1');
      expect(mockPrisma.user.findUnique).toHaveBeenCalled();
      expect(result).toEqual({});
    });

    it('Then it should throw an error if the user is not found', async () => {
      mockPrisma.user.findUnique.mockReturnValueOnce(null);
      expect(service.findOne('1')).rejects.toThrow('User 1 not found');
    });
  });
  describe('When we use the method findAll', () => {
    it('Then it should return all the users', async () => {
      const result = await service.findAll();
      expect(mockPrisma.user.findMany).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });
  describe('When we use the method findForLogin', () => {
    it('Then it should return the user with the matching email', async () => {
      const result = await service.findForLogin('cara@papa.com');
      expect(mockPrisma.user.findUnique).toHaveBeenCalled();
      expect(result).toEqual({});
    });

    it('Then it should throw an error if the user is not found', async () => {
      mockPrisma.user.findUnique.mockReturnValueOnce(null);
      expect(service.findForLogin('cara@papa.com')).rejects.toThrow(
        'Invalid input',
      );
    });
  });
  describe('When we use the method create', () => {
    it('Then it should return the new user', async () => {
      const result = await service.create({} as CreateUserDto);
      expect(mockPrisma.user.create).toHaveBeenCalled();

      expect(result).toEqual({});
    });
  });
  describe('When we use the method update', () => {
    it('Then it should return the updated user', async () => {
      const result = await service.update('1', {} as UpdateUserDto);
      expect(mockPrisma.user.update).toHaveBeenCalled();
      expect(result).toEqual({});
    });

    it('Then it should throw an error if the user is not found', async () => {
      mockPrisma.user.findUnique.mockReturnValueOnce(null);
      mockPrisma.user.update.mockRejectedValueOnce(new Error('User not found'));
      expect(service.update('1', { name: 'pepito' })).rejects.toThrow(
        'User 1 not found',
      );
    });
  });
});
