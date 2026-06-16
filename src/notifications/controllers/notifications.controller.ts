import { Controller, Get, Param, Patch, Request, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { NotificationsService } from "../services/notifications.service";
@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController{
    constructor(private notificationsService:NotificationsService){}
    @Get()
    async findAllByUser(@Request()req:any){
        return this.notificationsService.findAllByUser(req.user.sub);
    }
    @Get('unread')
    async findUnreadByUser(@Request()req:any){
        return this.notificationsService.findUnreadByUser(req.user.sub);
    }
    @Get('count')
    async countUnread(@Request()req:any){
        return this.notificationsService.countUnread(req.user.sub);
    }
    @Patch('read-all')
    async markAllAsRead(@Request()req:any){
        await this.notificationsService.markAllAsRead(req.user.sub);
    }
    @Patch(':id/read')
    async markOneAsRead(@Param('id')id:string,@Request()req:any){
        return this.notificationsService.markOneAsRead(id,req.user.sub);
    }
   

}