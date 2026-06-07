import { Expose } from 'class-transformer';
import { NotificationType } from '../entities/notification.entity';

export class ResponseNotificationDto {
  @Expose()
  id!: string;

  @Expose()
  type!: NotificationType;

  @Expose()
  message!: string;

  @Expose()
  isRead!: boolean;

  @Expose()
  metadata?: Record<string, any>;

  @Expose()
  createdAt!: Date;
}