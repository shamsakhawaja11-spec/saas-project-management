import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TimeEntry } from "./entities/time-entries.entity";
import { TimeTrackingController } from "./controllers/time-tracking.controller";
import { TimeEntriesRepository } from "./repositories/time-entries.repository";
import { TimeTrackingService } from "./services/time-tracking.service";

@Module({
    imports:[TypeOrmModule.forFeature([TimeEntry])],
    controllers:[TimeTrackingController],
    providers:[TimeEntriesRepository,TimeTrackingService],
    exports:[TimeTrackingService],
})
export class TimeTrackingModule{}