import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import {User} from '../users/entities/user.entity';
import { Workspace } from "../workspaces/entities/workspace.entity";
import { Project } from "../projects/entities/project.entity";
import { Board } from "../boards/entities/board.entity";
import { Task } from "../tasks/entities/task.entity";

export const databaseConfig:TypeOrmModuleOptions={
    type:'postgres',
    host:'localhost',
    port:5432,
    username:'postgres',
    password:'1234',
    database:'saas_db',
    entities:[User,Workspace,Project,Board,Task],
    synchronize:false,
    logging:true,
}

