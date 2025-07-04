import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/schema/user.schema';
import { Post } from 'src/posts/schema/post.schema';
import { Product } from 'src/products/schema/product.shecma';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Post.name) private postModul: Model<Post>,
    @InjectModel(Product.name) private products: Model<Product>,
  ) {}

  async getStatistics() {
    const totalUsers = await this.userModel.countDocuments();
    const totalPosts = await this.postModul.countDocuments();
    const totalProducts = await this.products.countDocuments();

    return { totalUsers, totalPosts, totalProducts };
  }
}
