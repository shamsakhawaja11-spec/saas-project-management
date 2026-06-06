import { IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID, Max, Min } from "class-validator";

export class CreateTimeEntryDto{
    @IsString()
    @Min(1)
    @Max(1440)
    @IsNotEmpty()
    minutes!:number;
    @IsString()
    @IsOptional()
    description?:string;
    @IsDateString()
    @IsNotEmpty()
    logData!:string;
    @IsUUID()
    @IsNotEmpty()
    taskId!:string;
}