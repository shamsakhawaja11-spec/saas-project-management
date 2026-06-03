import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Board } from "../entities/board.entity";
import { DataSource } from "typeorm";

@Injectable()
export class BoardsRepository extends Repository<Board>{
    constructor(dataSource:DataSource){
        super(Board,dataSource.createEntityManager());
    }
    async findByProjectId(projectId:string):Promise<Board []>{
        return this.find({where:{projectId},
            order:{createdAt:'DESC'},
        });
    }
    async findByIdAndProjectId(id:string,projectId:string):Promise<Board | null>{
        return this.findOne({
            where:{id,projectId},
        });
    }
    
}