import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WorkspacesRepository } from "./repositories/workspaces.repository";
import { WorkspacesService } from "./services/workspaces.service";
import { WorkspacesController } from "./controllers/workspaces.controller";
import { Workspace } from "./entities/workspace.entity";
@Module({
    imports:[TypeOrmModule.forFeature([Workspace])],
    providers:[WorkspacesRepository,WorkspacesService],
    controllers:[WorkspacesController],
    exports:[WorkspacesService],
})
export class WorkspacesModule{}