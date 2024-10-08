import container from "../../container.js";
import idValidation from "../Validations/idValidation.js";
import createNotificationValidation from "../Validations/CreatesValidation/createNotificationValidation.js";
import mongoose from "mongoose";
class NotificationManager {
    constructor() {
        this.notificationRepository = container.resolve('NotificationRepository');
    }
    async getAll(criteria) {
        return await this.notificationRepository.getAll(criteria);
    }
    async getNotificationById(id) {
        await idValidation.parseAsync(id);
        return await this.notificationRepository.getNotificationById(id);
    }
    async createNotification(bodyDto) {
        let body = { ...bodyDto, appointment_id: new mongoose.Types.ObjectId(bodyDto.appointment_id) };
        await createNotificationValidation.parseAsync(body);
        return await this.notificationRepository.createNotification(body);
    }
    async updateNotification(body, id) {
        await idValidation.parseAsync(id);
        return await this.notificationRepository.updateNotification(body, id);
    }
    async deleteNotification(id) {
        await idValidation.parseAsync(id);
        return await this.notificationRepository.deleteNotification(id);
    }
}
export default NotificationManager;
