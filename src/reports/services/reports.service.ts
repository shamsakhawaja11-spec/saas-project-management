import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { Task, TaskStatus } from '../../tasks/entities/task.entity';
import { TimeEntry } from '../../time-tracking/entities/time-entries.entity';
import { User } from '../../users/entities/user.entity';
import { TaskSummaryDto } from '../dto/task-summary.dto';
import { TimeSummaryDto } from '../dto/time-summary.dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(TimeEntry)
    private timeEntryRepository: Repository<TimeEntry>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getTaskSummaryByBoard(boardId: string): Promise<TaskSummaryDto> {
    const tasks = await this.taskRepository.find({ where: { boardId } });

    const now = new Date();
    const overdue = tasks.filter(
      (t) => t.dueDate && new Date(t.dueDate) < now && t.status !== TaskStatus.DONE,
    ).length;

    return {
      boardId,
      boardName: tasks[0]?.board?.name ?? 'Unknown',
      total: tasks.length,
      todo: tasks.filter((t) => t.status === TaskStatus.TODO).length,
      inProgress: tasks.filter((t) => t.status === TaskStatus.IN_PROGRESS).length,
      inReview: tasks.filter((t) => t.status === TaskStatus.IN_REVIEW).length,
      done: tasks.filter((t) => t.status === TaskStatus.DONE).length,
      overdue,
    };
  }

  async getTimeSummaryByUser(userId: string): Promise<TimeSummaryDto> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const result = await this.timeEntryRepository
      .createQueryBuilder('timeEntry')
      .select('SUM(timeEntry.minutes)', 'total')
      .where('timeEntry.userId = :userId', { userId })
      .getRawOne();

    const totalMinutes = parseInt(result.total) || 0;

    return {
      userId,
      userName: user?.name ?? 'Unknown',
      totalMinutes,
      formattedTime: `${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}m`,
    };
  }

  async getOverdueTasks(boardId: string): Promise<Task[]> {
    return this.taskRepository.find({
      where: {
        boardId,
        dueDate: LessThan(new Date()),
      },
    });
  }

  async getUserProductivity(boardId: string): Promise<{ userId: string; name: string; completed: number }[]> {
    const tasks = await this.taskRepository.find({
      where: { boardId, status: TaskStatus.DONE },
      relations: {assignee:true},
    });

    const map = new Map<string, { name: string; completed: number }>();

    for (const task of tasks) {
      if (!task.assigneeId) continue;
      const existing = map.get(task.assigneeId);
      if (existing) {
        existing.completed++;
      } else {
        map.set(task.assigneeId, {
          name: task.assignee?.name ?? 'Unknown',
          completed: 1,
        });
      }
    }

    return Array.from(map.entries()).map(([userId, data]) => ({
      userId,
      ...data,
    }));
  }
}