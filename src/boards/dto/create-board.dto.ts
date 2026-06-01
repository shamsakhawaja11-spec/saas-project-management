import { IsString, IsNotEmpty, IsOptional, Length } from "class-validator";

export class CreateBoardDto {
    @IsString()
    @IsNotEmpty()
    @Length(2, 100)
    name!: string;

    @IsOptional()
    @IsString()
    @Length(0, 500)
    description?: string;
}