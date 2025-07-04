import { IsNotEmpty, IsString } from "class-validator";

export class CreatePostDto {
    @IsString()
    title: string;

    @IsString()
    @IsNotEmpty()
    desc: string;
}
