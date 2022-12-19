import { Injectable } from '@nestjs/common';
import { Content } from '../entities/content';
import { Notification } from '../entities/notification';
import { NotificationsRepository } from '../repositories/notifcations-repository';
import { NotificationNotFound } from './errors/notification-not-found-error';

interface GetRecipientNotificationRequest {
  recipientId: string;
}

interface GetRecipientNotificationResponse {
    notifications: Notification[];
}
@Injectable()
export class GetRecipientNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}
  async execute(
    request: GetRecipientNotificationRequest,
  ): Promise<GetRecipientNotificationResponse> {
    const { recipientId } = request;
    const notifications = await this.notificationsRepository.findManyByRecipientId(
      recipientId,
    );

    return {
      notifications,
    };
  }
}
