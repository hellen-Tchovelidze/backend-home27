import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { BadRequestException } from '@nestjs/common';

describe('PostsService', () => {
  let postsService: PostsService;
  let postModel: Model<any>;
  let userModel: Model<any>;

  const mockPostModel = {
    create: jest.fn(),
    countDocuments: jest.fn(),
    find: jest.fn().mockReturnThis(),
    populate: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    sort: jest.fn().mockReturnThis(),
  };

  const mockUserModel = {
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
  };

  const userMock = {
    _id: 'user123',
    email: 'test@example.com',
    fullName: 'Test User',
    posts: [],
  };

  const postMock = {
    _id: 'post123',
    title: 'Test Post',
    desc: 'Description',
    author: 'user123',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        { provide: getModelToken('post'), useValue: mockPostModel },
        { provide: getModelToken('user'), useValue: mockUserModel },
      ],
    }).compile();

    postsService = module.get<PostsService>(PostsService);
    postModel = module.get<Model<any>>(getModelToken('post'));
    userModel = module.get<Model<any>>(getModelToken('user'));

    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should throw BadRequestException if user not found', async () => {
      mockUserModel.findById.mockResolvedValue(null);

      await expect(
        postsService.create({ title: 'Title', desc: 'Desc' }, 'wrongUserId'),
      ).rejects.toThrow(BadRequestException);
    });

    it('should create post and update user posts array', async () => {
      mockUserModel.findById.mockResolvedValue(userMock);
      mockPostModel.create.mockResolvedValue(postMock);
      mockUserModel.findByIdAndUpdate.mockResolvedValue({});

      const result = await postsService.create(
        { title: 'Title', desc: 'Desc' },
        'user123',
      );

      expect(mockUserModel.findById).toHaveBeenCalledWith('user123');
      expect(mockPostModel.create).toHaveBeenCalledWith({
        title: 'Title',
        desc: 'Desc',
        author: userMock._id,
      });
      expect(mockUserModel.findByIdAndUpdate).toHaveBeenCalledWith(userMock._id, {
        $push: { posts: postMock._id },
      });

      expect(result).toEqual({ success: 'ok', data: postMock });
    });
  });

  describe('findAll', () => {
    it('should return paginated posts', async () => {
      mockPostModel.countDocuments.mockResolvedValue(10);
      const postsArray = [postMock, postMock];
      mockPostModel.find.mockReturnThis();
      mockPostModel.populate.mockReturnThis();
      mockPostModel.skip.mockReturnThis();
      mockPostModel.limit.mockReturnThis();
      mockPostModel.sort.mockResolvedValue(postsArray);

      const queryParams = { page: 1, take: 2 };

      const result = await postsService.findAll(queryParams);

      expect(mockPostModel.countDocuments).toHaveBeenCalled();
      expect(mockPostModel.find).toHaveBeenCalled();
      expect(mockPostModel.populate).toHaveBeenCalledWith({
        path: 'author',
        select: 'email fullName',
      });
      expect(mockPostModel.skip).toHaveBeenCalledWith(0);
      expect(mockPostModel.limit).toHaveBeenCalledWith(2);
      expect(mockPostModel.sort).toHaveBeenCalledWith({ _id: -1 });

      expect(result).toEqual({
        total: 10,
        take: 2,
        page: 1,
        posts: postsArray,
      });
    });
  });
});
