import { Injectable, NotFoundException } from "@nestjs/common";
import { WorkspacesRepository } from "../repositories/workspaces.repository";
import { CreateWorkspaceDto } from "../dtos/create-workspace.dto";
import { WorkspaceResponseDto } from "../dtos/workspace-response.dto";
import { plainToClass } from "class-transformer";

@Injectable()
export class WorkspacesService{
    constructor(private workSpaceRepository:WorkspacesRepository){}
    
    async createWorkspace(ownerId:string,createWorkspaceDto:CreateWorkspaceDto):Promise<WorkspaceResponseDto>{
        const data=this.workSpaceRepository.create({
            name:createWorkspaceDto.name,
            description:createWorkspaceDto.description,
            ownerId,
        });
        const savedData=await this.workSpaceRepository.save(data);
        return plainToClass(WorkspaceResponseDto,savedData)
    }
    async getWorkspacesByUserId(ownerId:string):Promise<WorkspaceResponseDto []>{
        const user=await this.workSpaceRepository.findByOwnerId(ownerId);
        if(!user){
            throw new NotFoundException(`Workspace with ${ownerId} not found`);
        }
        return plainToClass(WorkspaceResponseDto,user);
    }
    async getWorkspaceById(id:string,ownerId:string):Promise<WorkspaceResponseDto>{
        const workspace=await this.workSpaceRepository.findByIdAndOwnerId(id,ownerId);
        if(!workspace){
            throw new NotFoundException(`Workspace not found with ${id} and ${ownerId}`);
        }
        return plainToClass(WorkspaceResponseDto,workspace);
    }
    async updateWorkspace(id:string,ownerId:string,updateData:Partial<CreateWorkspaceDto>):Promise<WorkspaceResponseDto>{
        const workspace=await this.workSpaceRepository.findByIdAndOwnerId(id,ownerId);
        if(!workspace){
            throw new NotFoundException('workspace not found');
        }
        Object.assign(workspace,updateData);
        const update=await this.workSpaceRepository.save(workspace);
        return plainToClass(WorkspaceResponseDto,workspace);
    }
    async deleteWorkspace(id:string,ownerId:string):Promise<void>{
        const workspace=await this.workSpaceRepository.findByIdAndOwnerId(id,ownerId);
        if(!workspace){
            throw new NotFoundException("Workspace not found");
        }
        await this.workSpaceRepository.delete(id);
    }
}
