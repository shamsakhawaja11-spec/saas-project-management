import { TaskPriority, TaskStatus } from "../entities/task.entity";

export class ResponseTaskDto{
    title!:string;
    description!:string;
    status!:TaskStatus;
    priority!:TaskPriority;
    position!:number;
    dueDate!:Date;
    estimatedHours!:number;
    boardId!:string;
    assigneeId!:string;
    creatorId!:string;
    createdAt!:Date;
    updatedAt!:Date;
}