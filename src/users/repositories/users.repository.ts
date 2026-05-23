import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { User } from "../entities/user.entity";

@Injectable()
export class UsersRepository extends Repository<User>{
    constructor(private dataSource:DataSource){
        super(User,dataSource.createEntityManager());
    }
    async findByEmail(email:string):Promise<User | null>{
        return await this.findOne({where:{email}});
    }
    async userExists(email:string):Promise<boolean>{
        const count= await this.count({where:{email}});
        return count>0;
    }
}