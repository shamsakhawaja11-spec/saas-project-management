import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateWorkspaceDto {

    @IsString()
    @MinLength(3)
    @MaxLength(50)
    @IsNotEmpty()
    name:string;
    @IsString()
    @IsOptional()
    @MaxLength(100)
    description?:string;

}