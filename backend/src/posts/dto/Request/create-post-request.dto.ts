import { IsDate, IsEmpty, IsNotEmpty, IsString } from "class-validator";

export class CreatePostRequest {
    @IsString()
    @IsNotEmpty()
    content: string;
}