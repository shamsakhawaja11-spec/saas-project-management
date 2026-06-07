import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '../tasks/entities/task.entity';
import { TimeEntry } from '../time-tracking/entities/time-entries.entity';
import { User } from '../users/entities/user.entity';
import { ReportsService } from './services/reports.service';
import { ReportsController } from './controllers/reports.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Task, TimeEntry, User])],
  controllers: [ReportsController],
  providers: [ReportsService],
  exports: [ReportsService],
})
export class ReportsModule {}