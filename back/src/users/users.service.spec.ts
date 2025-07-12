import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schema/user.schema';

describe('UsersService', () => {
  let service: UsersService;
  let userModel: Model<User>;

  const mockUserModel = {
    updateMany: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    find: jest.fn().mockReturnThis(),
    populate: jest.fn().mockReturnThis(),
    findByIdAndUpdate: jest.fn(),
    aggregate: jest.fn(),
  };

  const addressMock = {
    city: 'Tbilisi',
    street: 'Rustaveli',
    homeNumber: 12,
  };

  const userMock = {
    _id: 'user123',
    age: 25,
    email: 'user@test.com',
    fullName: 'Test User',
    address: addressMock,
    isAdult: true,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken('user'),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userModel = module.get<Model<User>>(getModelToken('user'));

    jest.clearAllMocks();
  });

  describe('addIsActiveFieldToUsers', () => {
    it('should call updateMany with correct filter and update', async () => {
      mockUserModel.updateMany.mockResolvedValue({ acknowledged: true });
      await service.addIsActiveFieldToUsers();
      expect(mockUserModel.updateMany).toHaveBeenCalledWith(
        { isActive: { $exists: false } },
        { $set: { isActive: true } },
      );
    });
  });

  describe('create', () => {
    it('should throw BadRequestException if email already exists', async () => {
      mockUserModel.findOne.mockResolvedValue(userMock);

      const dto: CreateUserDto = {
        age: 25,
        email: 'user@test.com',
        fullName: 'Test User',
        address: addressMock,
      };

      await expect(service.create(dto)).rejects.toThrow(BadRequestException);
    });

    it('should create new user and calculate isAdult correctly', async () => {
      mockUserModel.findOne.mockResolvedValue(null);
      mockUserModel.create.mockResolvedValue(userMock);

      const dto: CreateUserDto = {
        age: 25,
        email: 'newuser@test.com',
        fullName: 'New User',
        address: addressMock,
      };

      const result = await service.create(dto);

      expect(mockUserModel.findOne).toHaveBeenCalledWith({ email: dto.email });
      expect(mockUserModel.create).toHaveBeenCalledWith({
        ...dto,
        isAdult: true,
      });
      expect(result).toEqual({ success: 'ok', data: userMock });
    });

    it('should allow address to be undefined', async () => {
      mockUserModel.findOne.mockResolvedValue(null);
      const userWithoutAddress = { ...userMock, address: undefined };
      mockUserModel.create.mockResolvedValue(userWithoutAddress);

      const dto: CreateUserDto = {
        age: 25,
        email: 'noaddress@test.com',
        fullName: 'User No Address',
        // address omitted (optional)
      };

      const result = await service.create(dto);

      expect(mockUserModel.create).toHaveBeenCalledWith({
        ...dto,
        isAdult: true,
      });
      expect(result.data.address).toBeUndefined();
    });
  });

  describe('findAll', () => {
    it('should find all users and populate posts', async () => {
      mockUserModel.find.mockReturnThis();
      mockUserModel.populate.mockResolvedValue([userMock]);

      const result = await service.findAll();

      expect(mockUserModel.find).toHaveBeenCalled();
      expect(mockUserModel.populate).toHaveBeenCalledWith({
        path: 'posts',
        select: 'title desc author',
      });
      expect(result).toEqual([userMock]);
    });
  });

  describe('update', () => {
    it('should update user by id and return updated user', async () => {
      const updatedUser = { ...userMock, fullName: 'Updated Name' };
      mockUserModel.findByIdAndUpdate.mockResolvedValue(updatedUser);

      const updateDto = {
        age: 30,
        email: 'updated@test.com',
        fullName: 'Updated Name',
        address: addressMock,
      };

      const result = await service.update('user123', updateDto);

      expect(mockUserModel.findByIdAndUpdate).toHaveBeenCalledWith(
        'user123',
        updateDto,
        { new: true },
      );
      expect(result).toEqual(updatedUser);
    });
  });

  describe('getStatisticsByGender', () => {
    it('should aggregate statistics by gender', async () => {
      const aggregateResult = [
        { _id: 'male', avgAge: 30, count: 10 },
        { _id: 'female', avgAge: 28, count: 12 },
      ];
      mockUserModel.aggregate.mockResolvedValue(aggregateResult);

      const result = await service.getStatisticsByGender();

      expect(mockUserModel.aggregate).toHaveBeenCalledWith([
        {
          $group: {
            _id: '$gender',
            avgAge: { $avg: '$age' },
            count: { $sum: 1 },
          },
        },
      ]);
      expect(result).toEqual(aggregateResult);
    });
  });
});
