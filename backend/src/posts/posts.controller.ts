import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/current-user.decorators';
import { UserResponse } from 'src/users/dto/response/user-response.dto';
import { CreatePostRequest } from './dto/Request/create-post-request.dto';
import { PostResponse } from './dto/Response/post-response.dto';
import { Post as PostModel } from './model/Posts';
import { PostsService } from './posts.service';

@Controller('posts')
@UseGuards(JwtAuthGuard)
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Get()
  async getPosts(): Promise<PostModel[]> {
    return await this.postService.getPosts();
  }

  @Post()
  async createPost(
    @Body() createPostRequest: CreatePostRequest,
    @CurrentUser() user: UserResponse
  ): Promise<PostResponse> {
    return this.postService.createPost(createPostRequest, user);
  }
}
