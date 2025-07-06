import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { postSchema } from './schema/post.schema';
import { userSchema } from 'src/users/schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {schema: postSchema, name: 'post'},
      {schema: userSchema, name: 'user'},
    ])
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
