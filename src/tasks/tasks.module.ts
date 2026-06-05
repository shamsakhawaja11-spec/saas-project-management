import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Task } from "./entities/task.entity";
import { TasksService } from "./services/tasks.service";
import { TasksController } from "./controllers/tasks.controller";
import { TasksRepository } from "./repositories/task.repository";

@Module({
    imports:[TypeOrmModule.forFeature([Task])],
    controllers:[TasksController],
    providers:[TasksRepository,TasksService],
    exports:[TasksService],
})
export class TasksModule{}