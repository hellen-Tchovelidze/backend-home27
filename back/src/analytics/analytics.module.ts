import { Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from '../users/schema/user.schema';
import { Product, productSchema } from '../products/schema/product.schema';
import { Post, postSchema } from '../posts/schema/post.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: userSchema },
      { name: Product.name, schema: productSchema },
      { name: Post.name, schema: postSchema },
    ]),
  ],
  providers: [AnalyticsService],
  controllers: [AnalyticsController],
})
export class AnalyticsModule {}
