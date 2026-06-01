import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Project } from "./entities/project.entity";
import { ProjectsController } from "./controllers/projects.controller";
import { ProjectsService } from "./services/projects.service";
import { ProjectsRepository } from "./repositories";

@Module({
    imports:[TypeOrmModule.forFeature([Project])],
    controllers:[ProjectsController],
    providers:[ProjectsService,ProjectsRepository],
    exports:[ProjectsService]
})
export class ProjectsModule{}