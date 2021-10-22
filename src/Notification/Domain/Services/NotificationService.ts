import NotificationRepPayload from '../../InterfaceAdapters/Payloads/NotificationRepPayload';
import PushNotification from '../Entities/PushNotification';
import EventHandler from '../../../Shared/Events/EventHandler';
import SendMessageEvent from '../../../Shared/Events/SendMessageEvent';
import NotificationSendMessagePayload from '../../InterfaceAdapters/Payloads/NotificationSendMessagePayload';
import { injectable } from 'inversify';
import INotificationResponse from '../../InterfaceAdapters/INotificationResponse';
import INotificationService from '../../InterfaceAdapters/INotificationService';

@injectable()
class NotificationService implements INotificationService
{
    private eventHandler = EventHandler.getInstance();

    async execute(pushNotification: PushNotification, payload: NotificationRepPayload, message: string, name: string): Promise<INotificationResponse>
    {
        pushNotification.subscription = payload.getSubscription();
        pushNotification.name = name;
        await this.eventHandler.execute(SendMessageEvent.SEND_MESSAGE_EVENT, { push_notification: pushNotification, message });

        return { message: 'We\'ve sent you a notification' };
    }

    async createSubscription(payload: NotificationRepPayload): Promise<INotificationResponse>
    {
        const pushNotification = new PushNotification();
        const message = 'successful subscription';
        const name = 'Node Experience';

        return await this.execute(pushNotification, payload, message, name);
    }

    async sendPushNotification(payload: NotificationSendMessagePayload): Promise<INotificationResponse>
    {
        const pushNotification = new PushNotification();
        const message = payload.getMessage();
        const name = payload.getName();

        return await this.execute(pushNotification, payload, message, name);
    }
}

export default NotificationService;