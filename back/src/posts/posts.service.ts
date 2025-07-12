import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Post } from './schema/post.schema';
import { User } from 'src/users/schema/user.schema';
import { QueryParams } from './dto/query-params.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel('post') private postModel: Model<Post>,
    @InjectModel('user') private userModel: Model<User>,
  ){}



  async create({desc, title}: CreatePostDto, userId: string) {
    const existUser = await this.userModel.findById(userId)
    if(!existUser) throw new BadRequestException('User not found')

    const newPost = await this.postModel.create({title, desc, author: existUser._id})
    await this.userModel.findByIdAndUpdate(existUser._id, {$push: {posts: newPost._id}})
 

    return {success: 'ok', data: newPost}
  }

  async findAll({page, take}: QueryParams) {
    const total = await this.postModel.countDocuments()
    console.log(page, take)
    const posts = await this.postModel
                        .find()
                        .populate({path: 'author', select: 'email fullName'})
                        .skip((page - 1) * take)
                        .limit(take)
                        .sort({_id: -1})
    console.log(posts.length, "length")
    return {total, take, page, posts}
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
