import { IsNotEmpty, IsString, Max, Min } from "class-validator";

export class UpdateCommentDto{
    @IsString()
    @IsNotEmpty()
    @Min(3)
    @Max(100)
    content!:string;
}