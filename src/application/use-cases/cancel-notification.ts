import { Injectable } from "@nestjs/common";
import { Content } from "../entities/content";
import { Notification } from "../entities/notification";
import { NotificationRepository } from "../repositories/notification-repository";

interface CancelNotificationRequest{
    recipientId: string;
    content: string;
    category: string;
}

interface CancelNotificationResponse{
    notification: Notification;
}


@Injectable()
export class CancelNotification{
    constructor(
        private notificationRepository: NotificationRepository){}

    async execute(request: CancelNotificationRequest): Promise<CancelNotificationResponse> {
        const { recipientId, content, category } = request;

        const notification = new Notification({
            recipientId,
            content: new Content(content),
            category,
        });
        await this.notificationRepository.create(notification);
        
        return{
            notification,
        };
    }
}