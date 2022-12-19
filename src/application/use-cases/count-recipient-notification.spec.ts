import { Content } from '@application/entities/content';
import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotification } from './count-recipient-notification';

describe('Count Recipient Notification', () => {
  it('should be able to count recipient a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotification = new CountRecipientNotification(
      notificationsRepository,
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient1' }),
    );
    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient1' }),
    );
    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient2' }),
    );

    const { count } = await countRecipientNotification.execute({
      recipientId: 'recipient1',
    });

    expect(count).toEqual(2);
  });
});
