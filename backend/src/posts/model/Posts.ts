import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import { Document } from "mongoose";

@Schema({ versionKey: false, timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Post extends Document {
    @Prop()
    content: string;

    @Prop()
    user_id: string;

    @Prop()
    @Type(() => Date)
    updated_at: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);