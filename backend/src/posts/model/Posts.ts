import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ versionKey: false, timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Post extends Document {
    @Prop()
    content: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);