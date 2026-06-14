import { Body, Controller, Post, UseGuards,Request, Get, Param, Patch, Delete } from "@nestjs/common";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { TasksService } from "../services/tasks.service";
import { CreateTaskDto, ResponseTaskDto, UpdateTaskDto } from "../dto";

@Controller('/tasks')
@UseGuards(JwtAuthGuard)
export class TasksController{
    constructor(private tasksService:TasksService){}

    @Post()
    async create(@Request() req:any,@Body()createTaskDto:CreateTaskDto):Promise<ResponseTaskDto>{
        return await this.tasksService.create(req.user.sub,createTaskDto);
    }
    @Get('boards/:boardId')
    async findByBoard(@Param('boardId')boardId:string){
        return this.tasksService.findAllByBoard(boardId);
    }
    @Get(':id')
    async findByTask(@Param('id')Id:string){
        return this.tasksService.findById(Id);
    }
    @Patch(':id')
    async update(@Request()req:any,@Param('id')id:string,@Body()updateTaskDto:UpdateTaskDto){
        return this.tasksService.update(id,updateTaskDto,req.user.sub);
    }
    @Delete(':id')
    async remove(@Param('id')id:string,@Request() req:any){
        return this.tasksService.remove(id,req.user.sub);
    }
}