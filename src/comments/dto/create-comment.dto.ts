import { IsNotEmpty, IsString, IsUUID, Max, Min } from "class-validator";

export class CreateCommentDto{
    @IsString()
    @IsNotEmpty()
    @Min(3)
    @Max(100)
    content!:string;
    @IsUUID()
    @IsNotEmpty()
    taskId!:string;
}