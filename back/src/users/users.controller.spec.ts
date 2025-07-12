import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  const mockUsersService = {
    addIsActiveFieldToUsers: jest.fn(),
    getStatisticsByGender: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: mockUsersService }],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);

    jest.clearAllMocks();
  });

  describe('addIsActiveFieldToUsers', () => {
    it('should call usersService.addIsActiveFieldToUsers', async () => {
      mockUsersService.addIsActiveFieldToUsers.mockResolvedValue('ok');

      const result = await usersController.addIsActiveFieldToUsers();

      expect(mockUsersService.addIsActiveFieldToUsers).toHaveBeenCalled();
      expect(result).toBe('ok');
    });
  });

  describe('getUserStatistics', () => {
    it('should call usersService.getStatisticsByGender', async () => {
      const stats = [{ _id: 'male', avgAge: 30, count: 10 }];
      mockUsersService.getStatisticsByGender.mockResolvedValue(stats);

      const result = await usersController.getUserStatistics();

      expect(mockUsersService.getStatisticsByGender).toHaveBeenCalled();
      expect(result).toBe(stats);
    });
  });

  describe('findAll', () => {
    it('should call usersService.findAll', () => {
      mockUsersService.findAll.mockReturnValue(['user1', 'user2']);

      const result = usersController.findAll();

      expect(mockUsersService.findAll).toHaveBeenCalled();
      expect(result).toEqual(['user1', 'user2']);
    });
  });

  describe('findOne', () => {
    it('should call usersService.findOne with parsed id', () => {
      mockUsersService.findOne.mockReturnValue('user 123');

      const result = usersController.findOne('123');

      expect(mockUsersService.findOne).toHaveBeenCalledWith(123);
      expect(result).toBe('user 123');
    });
  });

  describe('update', () => {
    it('should call usersService.update with id and dto', () => {
      const dto: UpdateUserDto = { fullName: 'Updated', email: 'updated@mail.com', age: 28 };
      mockUsersService.update.mockReturnValue('updated user');

      const result = usersController.update('123', dto);

      expect(mockUsersService.update).toHaveBeenCalledWith('123', dto);
      expect(result).toBe('updated user');
    });
  });

  describe('remove', () => {
    it('should call usersService.remove with parsed id', () => {
      mockUsersService.remove.mockReturnValue('removed user');

      const result = usersController.remove('123');

      expect(mockUsersService.remove).toHaveBeenCalledWith(123);
      expect(result).toBe('removed user');
    });
  });
});
