import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Notification } from "../entities/notification.entity";
@Injectable()
export class NotificationsRepository extends Repository<Notification>{
    constructor(dataSource:DataSource){
        super(Notification,dataSource.createEntityManager())
    }
    async findByUser(userId:string):Promise<Notification[]>{
        return this.find({where:{userId},order:{createdAt:'DESC'}});
    }
    async findUnreadByUser(userId:string):Promise<Notification[]>{
        return this.find({where:{userId,isRead:false},order:{createdAt:'desc'}});
    }
    async countUnreadByUser(userId:string):Promise<number>{
        return this.count({where:{userId,isRead:false}});
    }
    async markAllAsRead(userId:string):Promise<void>{
        await this.update({userId,isRead:false},{isRead:true});
    }
}
