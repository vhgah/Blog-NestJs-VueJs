import { Injectable, NotFoundException } from '@nestjs/common';
import { UserResponse } from 'src/users/dto/response/user-response.dto';
import { CreatePostRequest } from './dto/Request/create-post-request.dto';
import { PostResponse } from './dto/Response/post-response.dto';
import { Post } from './model/Posts';
import { PostRepository } from './posts.repository';

@Injectable()
export class PostsService {
    constructor (
        private readonly postRepository: PostRepository
    ) {}

    async createPost(createPostRequest: CreatePostRequest, user: UserResponse): Promise<PostResponse> {
        
        const post = await this.postRepository.insertOne({
            ...createPostRequest,
            user_id: user._id,
        });

        return this.buildResponse(post);
    }

    async getPosts(): Promise<Post[]> {
        const posts = await this.postRepository.getAll();

        if (!posts) {
            throw new NotFoundException('Post data not found!');
        }

        return posts;
    }

    private buildResponse(post: Post): PostResponse {
        return {
            _id: post._id,
            content: post.content
        };
    }
}
