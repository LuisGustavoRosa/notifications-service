import { Injectable } from '@nestjs/common';
import { Content } from '../entities/content';
import { Notification } from '../entities/notification';
import { NotificationsRepository } from '../repositories/notifcations-repository';
import { NotificationNotFound } from './errors/notification-not-found-error';

interface CancelNotificationRequest {
  notificationId: string;
}

type CancelNotificationResponse = void;
@Injectable()
export class CancelNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}
  async execute(
    request: CancelNotificationRequest,
  ): Promise<CancelNotificationResponse> {
    const { notificationId } = request;
    const notification = await this.notificationsRepository.findByID(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.cancel();

    await this.notificationsRepository.save(notification);


  }
}
