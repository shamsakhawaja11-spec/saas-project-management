import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Workspace } from "../entities/workspace.entity";
import { DataSource } from "typeorm";

@Injectable()
export class WorkspacesRepository extends Repository<Workspace>{
    constructor( private dataSource:DataSource){
        super(Workspace,dataSource.createEntityManager());
    }
    async findByOwnerId(ownerId:string):Promise<Workspace[]> {
        return await this.find({where:{ownerId}});
    }
    async findByIdAndOwnerId(id:string,ownerId:string):Promise<Workspace | null>{
        return await this.findOne({where:{id,ownerId}});
    }
}