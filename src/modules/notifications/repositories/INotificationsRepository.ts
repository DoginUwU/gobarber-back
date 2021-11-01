import INotificationDTO from "../dtos/ICreateNotificationDTO";
import Notification from "../infra/typeorm/schemas/Notification";

interface INotificationsRepository {
    create(data: INotificationDTO): Promise<Notification>;
}

export default INotificationsRepository;
