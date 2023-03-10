import { Content } from '@application/entities/content';
import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { Notification } from '../entities/notification';
import { CancelNotification } from './cancel-notification';
import { NotificationNotFound } from './errors/notification-not-found-error';
import { ReadNotification } from './read-notification';

describe('Read Notification', () => {
  it('should be able to Read a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotification(notificationsRepository);
    const notification = makeNotification()
    await notificationsRepository.create(notification)
    await readNotification.execute({
        notificationId: notification.id
    });

    expect(notificationsRepository.notifications[0].readAt).toEqual(expect.any(Date))
  });
  it('should not be able to read a non existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotification(notificationsRepository);
   
    expect(()=>{
        return readNotification.execute({
            notificationId: "oidjiosdsd"
        });
    }).rejects.toThrow(NotificationNotFound);
  })
});
