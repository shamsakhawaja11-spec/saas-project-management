import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from '../users/entities/user.entity';
import { Workspace } from "../workspaces/entities/workspace.entity";
import { Project } from "../projects/entities/project.entity";
import { Board } from "../boards/entities/board.entity";
import { Task } from "../tasks/entities/task.entity";
import { Comment } from "../comments/entities/comment.entity";
import { TimeEntry } from "../time-tracking/entities/time-entries.entity";
import { Notification } from "../notifications/entities/notification.entity";
import { Subscription } from "../payments/entities/subscription.entity";
export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '1234',
  database: process.env.DB_NAME || 'saas_db',
  entities: [User, Workspace, Project, Board, Task, Comment, TimeEntry, Notification,Subscription],
  synchronize: false,
  logging: true,
};