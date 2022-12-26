import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Post } from "./model/Posts";

@Injectable()
export class PostRepository {
    constructor(
        @InjectModel(Post.name)
        private readonly post: Model<Post>
    ) {
    }

    async insertOne(data: Partial<Post>): Promise<Post> {
        const post = new this.post(data);
        return post.save();
    }

    async getUserPosts(userId: string): Promise<Post[]> {
        return await this.post.find({ user_id: userId }).exec();
    }

    async findOneById(postId: string): Promise<Post> {
        return await this.post.findById(postId);
    }
}