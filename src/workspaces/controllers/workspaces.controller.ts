import { Body, Controller, Post, Get, Param, Put, Delete, Request, UseGuards } from "@nestjs/common";
import { WorkspacesService } from "../services/workspaces.service";
import { CreateWorkspaceDto } from "../dto/create-workspace.dto";
import { WorkspaceResponseDto } from "../dto/workspace-response.dto";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
@Controller('workspaces')
@UseGuards(JwtAuthGuard)
export class WorkspacesController{
    constructor(private workspacesService:WorkspacesService){}

    @Post()
    @UseGuards(JwtAuthGuard)
    async createWorkspace(@Body() createWorkspaceDto:CreateWorkspaceDto, @Request() req:any):Promise<WorkspaceResponseDto>{
        const id=req.user?.sub;
        return this.workspacesService.createWorkspace(id,createWorkspaceDto);
    }
    @Get()
    async getWorkspaces(@Request() req:any):Promise<WorkspaceResponseDto[]>{

        const id=req.user?.sub;
        return this.workspacesService.getWorkspacesByUserId(id);
    }
    @Get(':id')
    async getworkspaceById(@Param('id') id:string,@Request() req:any){
        const ownerId=req.user?.sub;
        return this.workspacesService.getWorkspaceById(id,ownerId);
    }
    @Put(':id')
    async updateWorkspace( @Param('id') id:string,@Request() req:any,@Body() updateWorkspace:Partial<CreateWorkspaceDto>):Promise<WorkspaceResponseDto>{
       const ownerId=req.user?.sub;
        return this.workspacesService.updateWorkspace(id,ownerId,updateWorkspace);
    }
    @Delete(':id')
    async deleteWorkspace(@Param('id') id:string,@Request() req:any):Promise<void>{
        const ownerId=req.user?.sub;
        return this.workspacesService.deleteWorkspace(id,ownerId);
    }
}