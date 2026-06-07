import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { ReportsService } from "../services/reports.service";

@Controller('reports')
@UseGuards(JwtAuthGuard)
export class ReportsController {
    constructor(private reportsService: ReportsService) {}

    @Get('board/:boardId/tasks')
    getTaskSummary(@Param('boardId') boardId: string) {
        return this.reportsService.getTaskSummaryByBoard(boardId);
    }

    @Get('board/:boardId/overdue')
    getOverdueTasks(@Param('boardId') boardId: string) {
        return this.reportsService.getOverdueTasks(boardId);
    }

    @Get('board/:boardId/productivity')
    getUserProductivity(@Param('boardId') boardId: string) {
        return this.reportsService.getUserProductivity(boardId);
    }

    @Get('user/:userId/time')
    getTimeSummary(@Param('userId') userId: string) {
        return this.reportsService.getTimeSummaryByUser(userId);
    }
}