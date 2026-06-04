import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { TasksRepository } from "../repositories/task.repository";
import { Task } from "../entities/task.entity";
import { CreateTaskDto, UpdateTaskDto } from "../dto";

@Injectable()
export class TasksService{
    constructor(private tasksRepository:TasksRepository){}
    async create(creatorId:string,createTaskDto:CreateTaskDto):Promise<Task>{
        return this.tasksRepository.createTask(createTaskDto,creatorId);
    }
    async findAllByBoard(boardId:string):Promise<Task[]>{
        const tasks=await this.tasksRepository.findAllByBoard(boardId);
        if(tasks.length==0){
            throw new NotFoundException('not found');
        }
        return tasks;
    }
    async findById(taskId:string):Promise<Task>{
        const task=await this.tasksRepository.findById(taskId);
        if(!task){
            throw new NotFoundException('not found');
        }
        return task;
    }
    async update(taskId:string,updateTaskDto:UpdateTaskDto,userId:string):Promise<Task>{
        const task=await this.findById(taskId);
        if(userId!==task.creatorId){
            throw new ForbiddenException('not allowed to update tasks');
        }
        return this.tasksRepository.updateTask(task,updateTaskDto)
    }
    async remove(id:string,userId:string):Promise<void>{
        const task= await this.findById(id);
        if(userId!=task.creatorId){
            throw new ForbiddenException('not allowed to delete');
        }
        await this.tasksRepository.removeTask(id);
    }
}
