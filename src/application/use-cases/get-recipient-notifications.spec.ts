import { Content } from '@application/entities/content';
import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { GetRecipientNotification } from './get-recipient-notification';

describe('Get Recipient Notification', () => {
  it('should be able to get recipient a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const getRecipientNotification = new GetRecipientNotification(
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

    const { notifications } = await getRecipientNotification.execute({
      recipientId: 'recipient1',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(expect.arrayContaining([
        expect.objectContaining({recipientId : 'recipient1'}),
        expect.objectContaining({recipientId : 'recipient1'}),
    ]))
  });
});
