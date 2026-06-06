import { Body, Controller, Post, UseGuards,Request, Param, Get, Res, Put, ParseArrayPipe, Req, Delete } from "@nestjs/common";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { TimeTrackingService } from "../services/time-tracking.service";
import { CreateTimeEntryDto, ResponseTimeEntryDto, UpdateTimeEntryDto } from "../dto";

@Controller('time-entries')
@UseGuards(JwtAuthGuard)
export class TimeTrackingController{
    constructor(private timetrackingService:TimeTrackingService){}

    @Post()
    async create(@Body()dto:CreateTimeEntryDto,@Request()req:any){
        return this.timetrackingService.create(dto,req.user.userId);
    }
    @Get('/task/:taskId/')
    async findByTask(@Param('taskId')taskId:string){
        return this.timetrackingService.findByTask(taskId);
    }
    @Get('/user/userId')
    async findByUser(@Param('userId')userId:string){
        return this.timetrackingService.findByUser(userId);
    }
    @Get('my-entries')
    async findMyEntries(@Request()req:any){
        return this.timetrackingService.findByUser(req.user.id);
    }
    @Get('/task/:taslId/total')
    getTotalByTask(@Param('taskId')taskId:string){
        return this.timetrackingService.gotTotalMinutesByTask(taskId);
    }
    @Get('my-total')
    getMyTotal(@Request()req:any){
        return  this.timetrackingService.gotTotalMinutesByTask(req.user.id);
    }
    @Put(':id')
    update(@Param('id')id:string,@Body()dto:UpdateTimeEntryDto,@Request()req:any){
        return this.timetrackingService.update(id,dto,req.user.id)
    }
    @Delete(':id')
    remove(@Param('id')id:string,@Request()req:any){
        return this.timetrackingService.remove(id,req.user.id);
    }
}