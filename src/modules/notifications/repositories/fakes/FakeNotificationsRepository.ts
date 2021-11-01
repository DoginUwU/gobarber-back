import INotificationDTO from "@modules/notifications/dtos/ICreateNotificationDTO";
import Notification from "@modules/notifications/infra/typeorm/schemas/Notification";
import INotificationsRepository from "@modules/notifications/repositories/INotificationsRepository";
import { ObjectId } from "mongodb";

class FakeNotificationsRepository implements INotificationsRepository {
    private notifications: Notification[] = [];

    public async create(data: INotificationDTO): Promise<Notification> {
        const notification = new Notification();

        Object.assign(notification, { id: new ObjectId(), ...data });

        this.notifications.push(notification);

        return notification;
    }
}

export default FakeNotificationsRepository;
