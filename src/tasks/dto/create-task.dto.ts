import { IsDateString, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, Max, MaxLength, Min, MinLength } from "class-validator";
import { TaskPriority, TaskStatus } from "../entities/task.entity";

export class CreateTaskDto{
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(100)
    title!:string;
    @IsOptional()
    description?:string;
    @IsEnum(TaskStatus)
    @IsOptional()
    status?:TaskStatus;
    @IsEnum(TaskPriority)
    @IsOptional()
    priority?:TaskPriority;
    @IsInt()
    @IsOptional()@Min(0)
    position?:number;
    @IsOptional()
    @IsDateString()
    duedate?:string;
    @IsOptional()
    @Min(0)
    @Max(1000)
    estimatedHours?:number;
    @IsUUID()
    @IsNotEmpty()
    boardId!:string;
    @IsOptional()
    @IsUUID()
    assigneeId?:string;

}