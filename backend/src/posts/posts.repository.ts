import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PostResponse } from "./dto/Response/post-response.dto";
import { Post } from "./model/Posts";

@Injectable()
export class PostRepository {
    constructor(
        @InjectModel(Post.name)
        private readonly post: Model<Post>
    ) {
    }

    async insertOne(data: Partial<Post>): Promise<PostResponse> {
        const post = new this.post(data);
        return post.save();
    }

    async getAll(): Promise<Post[]> {
        return await this.post.find().exec();
    }

    async getById(_id: string): Promise<Post> {
        return await this.post.findById(_id).exec();
    }

    async update(id: string, content: string): Promise<Post> {
        return await this.post.findByIdAndUpdate(id, )
    }
}