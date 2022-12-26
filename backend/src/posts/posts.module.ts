import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsController } from './posts.controller';
import { PostRepository } from './posts.repository';
import { PostsService } from './posts.service';
import { Post, PostSchema } from "./model/Posts";
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
        {
            name: Post.name,
            schema: PostSchema,
        }
    ])
],
  controllers: [PostsController],
  providers: [PostsService, PostRepository, JwtAuthGuard]
})
export class PostsModule {}
