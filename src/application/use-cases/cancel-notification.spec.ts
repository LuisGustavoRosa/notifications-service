import { Content } from '@application/entities/content';
import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { Notification } from '../entities/notification';
import { CancelNotification } from './cancel-notification';
import { NotificationNotFound } from './errors/notification-not-found-error';

describe('Send Notification', () => {
  it('should be able to send a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);
    const notification = makeNotification()
    await notificationsRepository.create(notification)
    await cancelNotification.execute({
        notificationId: notification.id
    });

    expect(notificationsRepository.notifications[0].canceledAt).toEqual(expect.any(Date))
  });
  it('should not be able to cancel a non existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);
   
    expect(()=>{
        return cancelNotification.execute({
            notificationId: "oidjiosdsd"
        });
    }).rejects.toThrow(NotificationNotFound);
  })
});
