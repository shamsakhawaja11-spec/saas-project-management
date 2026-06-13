import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Task, TaskPriority, TaskStatus } from "../entities/task.entity";
import { CreateTaskDto } from "../dto/create-task.dto";
import { UpdateTaskDto } from "../dto";


@Injectable()
// export class TasksRepository {
//   constructor(
//     @InjectRepository(Task)
//     private readonly taskRepo: Repository<Task>,
//   ) {}
export class TasksRepository extends Repository<Task>{
    constructor(dataSource:DataSource){
        super(Task,dataSource.createEntityManager())
    }
    
    async createTask(createTaskDto:CreateTaskDto,creatorId:string):Promise<Task>{
        const task= this.create({
        ...createTaskDto,
        creatorId,
        status: createTaskDto.status as TaskStatus,
        priority: createTaskDto.priority as TaskPriority,
        });
        return await this.save(task)
    }
    async findAllByBoard(boardId:string):Promise<Task[]>{
        return await this.find({where:{boardId}, order:{position:'ASC',createdAt:'ASC'}
        });
    }
    async findById(taskId:string):Promise<Task | null>{
        return await this.findOne({where:{id:taskId}});
    }
    async updateTask(task:Task,updateTask:Partial<UpdateTaskDto>):Promise<Task>{
       Object.assign(task,updateTask);
       return await this.save(task);
    }
    async removeTask(id:string):Promise<void>{
        await this.delete(id);
    }
}
