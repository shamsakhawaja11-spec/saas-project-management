import { Injectable, NotFoundException } from "@nestjs/common";
import { NotificationsRepository } from "../repositories/notifications.repository";
import { CreateNotificationDto } from "../dto";
import { Notification as NotificationEntity, NotificationType } from "../entities/notification.entity";
import { NotificationsGateway } from "../gateways/notifications.gateway";

@Injectable()
export class NotificationsService {
  constructor(private notificationsRepository: NotificationsRepository,private notificationGateway:NotificationsGateway) {}

  async create(dto: CreateNotificationDto): Promise<NotificationEntity> {
    const notification = this.notificationsRepository.create({
      type:dto.type,
      message:dto.message,
      userId:dto.userId,
      metaData:dto.metaData,
    });
    const saved=await this.notificationsRepository.save(notification);
    this.notificationGateway.sendNotificationToUser(dto.userId,saved);
    return saved;
  }

  async findAllByUser(userId: string): Promise<NotificationEntity[]> {
    return this.notificationsRepository.findByUser(userId);
  }

  async findUnreadByUser(userId: string): Promise<NotificationEntity[]> {
    return this.notificationsRepository.findUnreadByUser(userId);
  }

  async countUnread(userId: string): Promise<{ count: number }> {
    const count = await this.notificationsRepository.countUnreadByUser(userId);
    return { count };
  }

  async markOneAsRead(id: string, userId: string): Promise<NotificationEntity> {
    const notification = await this.notificationsRepository.findOne({
      where: { id, userId },
    });
    if (!notification) {
      throw new NotFoundException('Notification not found');
    }
    notification.isRead = true;
    return this.notificationsRepository.save(notification);
  }

  async markAllAsRead(userId: string): Promise<void> {
    return this.notificationsRepository.markAllAsRead(userId);
  }

  async notifyTaskAssigned(
    assigneeId: string,
    taskTitle: string,
    assignedBy: string,
    taskId: string,
  ): Promise<void> {
    await this.create({
      type: NotificationType.TASK_ASSIGNED,
      message: `${assignedBy} assigned "${taskTitle}" to you`,
      userId: assigneeId,
      metaData: { taskId, taskTitle, assignedBy },
    });
  }

  async notifyCommentAdded(
    recipientId: string,
    commenterName: string,
    taskTitle: string,
    taskId: string,
    commentId: string,
  ): Promise<void> {
    await this.create({
      type: NotificationType.COMMENT_ADDED,
      message: `${commenterName} commented on "${taskTitle}"`,
      userId: recipientId,
      metaData: { taskId, taskTitle, commenterName, commentId },
    });
  }
}