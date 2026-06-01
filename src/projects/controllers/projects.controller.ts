import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ProjectsService } from "../services/projects.service";
import { CreateProjectDto, ResponseProjectDto, UpdateProjectDto } from "../dto";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";

@Controller('/workspaces/:workspaceId/projects')
@UseGuards(JwtAuthGuard)
export class ProjectsController{
    constructor(private projectService:ProjectsService){}
    @Post()
    async create(@Param('workspaceId') WorkspaceId:string,@Body() createProjectDto:CreateProjectDto):Promise<ResponseProjectDto>{
        return await this.projectService.create(createProjectDto,WorkspaceId);
    }
    @Get()
    async findAll(@Param('workspaceId') workspaceId:string):Promise<ResponseProjectDto []>{
        return await this.projectService.findAll(workspaceId);
    }
    @Get(':projectId')
    async findOne(@Param('projectId') projectId:string,@Param('workspaceId') WorkspaceId:string):Promise<ResponseProjectDto>{
        return await this.projectService.findOne(projectId,WorkspaceId);
    }
    @Patch(':projectId')
    async update(@Param('workspaceId') WorkspaceId:string,@Param('projectId') projectId:string,@Body() updatedProjectDto:UpdateProjectDto):Promise<ResponseProjectDto>{
        return await this.projectService.update(projectId,WorkspaceId,updatedProjectDto);
    }
    @Delete(':projectId')
    async remove(@Param('workspaceId') workspaceId:string,@Param('projectId')projectId:string):Promise<void>{
        return await this.projectService.remove(projectId,workspaceId);
    }
}

