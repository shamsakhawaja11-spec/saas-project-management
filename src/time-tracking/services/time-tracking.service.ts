import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { TimeEntriesRepository } from "../repositories/time-entries.repository";
import { TimeEntry } from "../entities/time-entries.entity";
import { CreateTimeEntryDto, UpdateTimeEntryDto } from "../dto";

@Injectable()
export class TimeTrackingService{
    constructor(private timeEntriesRepository:TimeEntriesRepository){}
    async create(createTimeEntry:CreateTimeEntryDto,userId:string):Promise<TimeEntry>{
        const res=this.timeEntriesRepository.create({...createTimeEntry,userId});
        return await this.timeEntriesRepository.save(res);
    }
    async findByTask(taskId:string):Promise<TimeEntry[]>{
        return this.timeEntriesRepository.findByTask(taskId);
    }
    async findByUser(userId:string):Promise<TimeEntry[]>{
        return this.timeEntriesRepository.findByUser(userId);
    }
    async gotTotalMinutesByTask(taskId:string):Promise<number>{
        return this.timeEntriesRepository.getTotalMinutesByTask(taskId);
    }
    async gotTotalMinutesByUser(userId:string):Promise<number>{
        return this.timeEntriesRepository.getTotalMinutesByUser(userId);
    }
    async update(id:string,dto:UpdateTimeEntryDto,userId:string):Promise<TimeEntry>{
        const entry=await this.findEntryAndVerifyOwnership(id,userId);
        Object.assign(entry,dto);
        return this.timeEntriesRepository.save(entry);
    }
    async remove(id:string,userId:string):Promise<void>{
        const entry=await this.findEntryAndVerifyOwnership(id,userId);
        await this.timeEntriesRepository.remove(entry);
    }
    private async findEntryAndVerifyOwnership(id:string,userId:string):Promise<TimeEntry>{
        const entry=await this.timeEntriesRepository.findOne({where:{id}});
        if(!entry){
            throw new NotFoundException('not found');
        }
        if(entry.userId!==userId){
            throw new ForbiddenException('only allowed to modified your own time entries');
        }
        return entry
    }
}