import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserResponse } from 'src/users/dto/response/user-response.dto';
import { CreatePostRequest } from './dto/Request/create-post-request.dto';
import { PostResponseUpdate } from './dto/Response/post-reponse-update.dto';
import { PostResponse } from './dto/Response/post-response.dto';
import { Post } from './model/Posts';
import { PostRepository } from './posts.repository';
import * as moment from 'moment';

@Injectable()
export class PostsService {
    constructor (
        private readonly postRepository: PostRepository
    ) {}

    async createPost(createPostRequest: CreatePostRequest, user: UserResponse): Promise<PostResponse> {
        
        const post = await this.postRepository.insertOne({
            content: createPostRequest.content,
            user_id: user._id,
        });

        return this.buildResponse(post);
    }

    async updatePost(postId: string, createPostRequest: CreatePostRequest, user: UserResponse): Promise<PostResponseUpdate> {
        
        if (!postId.match(/^[0-9a-fA-F]{24}$/)) {
            throw new NotFoundException('Post not found with post_id: ' + postId);
        }

        let post = await this.getPostById(postId);

        if (post.user_id !== user._id.toString()) {
            throw new UnauthorizedException();
        }

        post.content = createPostRequest.content;
        post.save();

        return this.buildResponseUpdate(post);
    }

    async getPostById(postId: string): Promise<Post> {
        const post = await this.postRepository.findOneById(postId)
        if (!post) {
            throw new NotFoundException('Post not found with post_id: ' + postId);
        }
        return post;
    }

    async getUserPosts(userId: string): Promise<Post[]> {
        const posts = await this.postRepository.getUserPosts(userId);

        if (!posts || posts.length === 0) {
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

    private buildResponseUpdate(post: Post): PostResponseUpdate {
        return {
            _id: post._id,
            content: post.content,
            updated_at: moment().format('DD/MM/YYYY HH:mm:ss')
        };
    }
}
