import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';

const mockUsersService = {
  findAll: jest.fn().mockResolvedValue([]),
  findOne: jest.fn().mockResolvedValue({}),
  findForLogin: jest.fn().mockResolvedValue({}),
  create: jest.fn().mockResolvedValue({}),
  update: jest.fn().mockResolvedValue({}),
};

const mockPrismaService = {
  user: {
    findMany: jest.fn().mockResolvedValue([]),
    findUnique: jest.fn().mockReturnValue({}),
    create: jest.fn().mockReturnValue({}),
    update: jest.fn().mockReturnValue({}),
  },
};

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('When we use the method findAll', () => {
    it('should return all users', async () => {
      const result = await controller.findAll();
      expect(mockUsersService.findAll).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });
  describe('When we use the method findOne', () => {
    it('should return the user with the id', async () => {
      const result = await controller.findOne('1');
      expect(mockUsersService.findOne).toHaveBeenCalled();
      expect(result).toEqual({});
    });
  });
  describe('When we use the method register', () => {
    it('should create a new user', async () => {
      const mockUserDto = {} as CreateUserDto;
      const result = await controller.register(mockUserDto);
      expect(mockUsersService.create).toHaveBeenCalled();
      expect(result).toEqual({});
    });
  });
  describe('When we use the method update', () => {
    it('should update a user', async () => {
      const mockUserDto = {
        password: '12345',
      } as CreateUserDto;
      const result = await controller.update('1', mockUserDto);
      expect(mockUsersService.update).toHaveBeenCalled();
      expect(result).toEqual({});
    });
  });
});
