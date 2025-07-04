import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import { postSchema } from 'src/posts/schema/post.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        schema: UserSchema,
        name: 'user',
      },
      {
        schema: postSchema,
        name: 'post',
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
