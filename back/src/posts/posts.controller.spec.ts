import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { QueryParams } from './dto/query-params.dto';

describe('PostsController', () => {
  let postsController: PostsController;
  let postsService: PostsService;

  const mockPostsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [{ provide: PostsService, useValue: mockPostsService }],
    }).compile();

    postsController = module.get<PostsController>(PostsController);
    postsService = module.get<PostsService>(PostsService);

    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should call postsService.create with correct params', async () => {
      const dto: CreatePostDto = { title: 'Test', desc: 'Description' };
      const userId = 'user123';

      mockPostsService.create.mockResolvedValue('created_post');

      const result = await postsController.create(userId, dto);

      expect(mockPostsService.create).toHaveBeenCalledWith(dto, userId);
      expect(result).toBe('created_post');
    });
  });

  describe('findAll', () => {
    it('should call postsService.findAll with query params', async () => {
      const query: QueryParams = { page: 1, take: 5 };
      const mockResult = { total: 10, take: 5, page: 1, posts: [] };

      mockPostsService.findAll.mockResolvedValue(mockResult);

      const result = await postsController.findAll(query);

      expect(mockPostsService.findAll).toHaveBeenCalledWith(query);
      expect(result).toBe(mockResult);
    });
  });

  describe('findOne', () => {
    it('should call postsService.findOne with parsed id', () => {
      const id = '42';
      const mockResult = 'post 42';

      mockPostsService.findOne.mockReturnValue(mockResult);

      const result = postsController.findOne(id);

      expect(mockPostsService.findOne).toHaveBeenCalledWith(42);
      expect(result).toBe(mockResult);
    });
  });

  describe('update', () => {
    it('should call postsService.update with parsed id and dto', () => {
      const id = '99';
      const updateDto = { title: 'Updated', desc: 'Updated desc' };

      mockPostsService.update.mockReturnValue('updated post');

      const result = postsController.update(id, updateDto);

      expect(mockPostsService.update).toHaveBeenCalledWith(99, updateDto);
      expect(result).toBe('updated post');
    });
  });

  describe('remove', () => {
    it('should call postsService.remove with parsed id', () => {
      const id = '123';

      mockPostsService.remove.mockReturnValue('removed post');

      const result = postsController.remove(id);

      expect(mockPostsService.remove).toHaveBeenCalledWith(123);
      expect(result).toBe('removed post');
    });
  });
});
