import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/schema/user.schema';
import { Product } from '../products/schema/product.schema';
import { Post } from '../posts/schema/post.schema';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(Post.name) private postModel: Model<Post>,
  ) {}

  async getAnalytics() {
    const totalUsers = await this.userModel.countDocuments();
    const totalProducts = await this.productModel.countDocuments();
    const totalPosts = await this.postModel.countDocuments();

    const avgProductPriceResult = await this.productModel.aggregate([
      { $group: { _id: null, avgPrice: { $avg: '$price' } } },
    ]);

    const avgProductPrice = avgProductPriceResult[0]?.avgPrice || 0;

    return {
      totalUsers,
      totalProducts,
      totalPosts,
      avgProductPrice,
    };
  }
}
