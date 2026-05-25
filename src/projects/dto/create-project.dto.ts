import { IsNotEmpty, IsOptional, IsString, IsUUID, Length } from "class-validator";
import { Column } from "typeorm";

export class CreateProjectDto{
    @IsString()
    @IsNotEmpty()
    @Length(2,90)
    name!:string;

    @IsOptional()
    @IsString()
    @Column()
    description?:string;
}