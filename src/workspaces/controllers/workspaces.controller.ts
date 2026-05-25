import { Body, Controller, Post, Get, Param, Put, Delete, Request } from "@nestjs/common";
import { WorkspacesService } from "../services/workspaces.service";
import { CreateWorkspaceDto } from "../dtos/create-workspace.dto";
import { WorkspaceResponseDto } from "../dtos/workspace-response.dto";
@Controller('workspaces')
export class WorkspacesController{
    constructor(private workspacesService:WorkspacesService){}

    @Post()
    async createWorkspace(@Body() createWorkspaceDto:CreateWorkspaceDto, @Request() req:any):Promise<WorkspaceResponseDto>{
        const id='36802505-18ea-4026-8c0d-5c6aa01b9d29';
        return this.workspacesService.createWorkspace(id,createWorkspaceDto);
    }
    @Get()
    async getWorkspaces(@Request() req:any):Promise<WorkspaceResponseDto[]>{
        const id='36802505-18ea-4026-8c0d-5c6aa01b9d29';

        //const id=req.user?.id;
        return this.workspacesService.getWorkspacesByUserId(id);
    }
    @Get(':id')
    async getworkspaceById(@Param('id') id:string,@Request() req:any){
       // const ownerId=req.user?.id;
        const ownerId='36802505-18ea-4026-8c0d-5c6aa01b9d29';
        return this.workspacesService.getWorkspaceById(id,ownerId);
    }
    @Put(':id')
    async updateWorkspace( @Param('id') id:string,@Body() updateWorkspace:Partial<CreateWorkspaceDto>):Promise<WorkspaceResponseDto>{
       // const ownerId=req.user?.id;
        const ownerId='36802505-18ea-4026-8c0d-5c6aa01b9d29';
        return this.workspacesService.updateWorkspace(id,ownerId,updateWorkspace);
    }
    @Delete(':id')
    async deleteWorkspace(@Param('id') id:string,@Request() req:any):Promise<void>{
      //  const ownerId=req.user?.id;
        const ownerId='36802505-18ea-4026-8c0d-5c6aa01b9d29';

        return this.workspacesService.deleteWorkspace(id,ownerId);
    }

}