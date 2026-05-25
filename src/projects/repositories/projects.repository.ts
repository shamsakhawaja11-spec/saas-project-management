import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Project } from "../entities/project.entity";
import { DataSource } from "typeorm";

@Injectable()
export class ProjectsRepository extends Repository<Project>{
    constructor(private dataSource:DataSource){
        super(Project,dataSource.createEntityManager());
    }
    async findByWorkspaceId(workspaceId:string):Promise<Project[]>{
        return await this.find({where:{workspaceId},
            order:{createdAt:'DESC'}
        });
    }
    async findByIdAndWorkspaceId(id:string,workspaceId:string):Promise<Project|null>{
        return await this.findOne({where:{id,workspaceId}});
    }
}