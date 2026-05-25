import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import {User} from '../users/entities/user.entity';
import { Workspace } from "../workspaces/entities/workspace.entity";

export const databaseConfig:TypeOrmModuleOptions={
    type:'postgres',
    host:'localhost',
    port:5432,
    username:'postgres',
    password:'1234',
    database:'saas_db',
    entities:[User,Workspace],
    synchronize:true,
    logging:true,


}

