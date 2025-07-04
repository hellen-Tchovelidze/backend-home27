import { Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schema/user.schema';
import { Post, postSchema } from 'src/posts/schema/post.schema';
import { Product, ProductSchema } from 'src/products/schema/product.shecma';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Post.name, schema: postSchema },
      { name: Product.name, schema: ProductSchema },
    ]),
  ],

  controllers: [AnalyticsController],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}
