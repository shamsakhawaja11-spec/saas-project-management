import { Injectable, ParseIntPipe } from "@nestjs/common";
import { Repository } from "typeorm";
import { TimeEntry } from "../entities/time-entries.entity";
import { DataSource } from "typeorm";

@Injectable()
export class TimeEntriesRepository extends Repository<TimeEntry>{
    constructor(dataSource:DataSource){
        super(TimeEntry,dataSource.createEntityManager());
    }

    async findByTask(taskId:string):Promise<TimeEntry[]>{
        return  this.find({where:{taskId},order:{logDate:'DESC'}});
    }
    async findByUser(userId:string):Promise<TimeEntry[]>{
        return this.find({where:{userId},order:{logDate:'DESC'}});
    }
    async findByTaskAndUser(taskId:string,userId:string):Promise<TimeEntry[]>{
        return this.find({where:{taskId,userId},order:{logDate:'DESC'}});
    }
    async getTotalMinutesByTask(taskId:string):Promise<number>{
       const result=await this.createQueryBuilder('timeEntry')
       .select('Sum(timeEntry.minutes)','total')
       .where('timeEntry.taskId=:taskId',{taskId})
       .getRawOne();
       return parseInt(result.total)||0;
    }
    async getTotalMinutesByUser(userId:string):Promise<number>{
        const result=await this.createQueryBuilder('timeEntry')
        .select('sum(timeEntry.minutes)','total')
        .where('timeEntry.userId=:userId',{userId})
        .getRawOne();
        return parseInt(result.total)||0;
    }

}
