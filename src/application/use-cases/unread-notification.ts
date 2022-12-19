import { Injectable } from '@nestjs/common';
import { Content } from '../entities/content';
import { Notification } from '../entities/notification';
import { NotificationsRepository } from '../repositories/notifcations-repository';
import { NotificationNotFound } from './errors/notification-not-found-error';

interface UnreadNotificationRequest {
  notificationId: string;
}

type UnreadNotificationResponse = void;
@Injectable()
export class UnreadNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}
  async execute(
    request: UnreadNotificationRequest,
  ): Promise<UnreadNotificationResponse> {
    const { notificationId } = request;
    const notification = await this.notificationsRepository.findByID(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.unread();

    await this.notificationsRepository.save(notification);


  }
}
