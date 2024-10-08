import mongoose, { PaginateResult } from 'mongoose';
import notificationSchema, {Notification} from '../Models/notificationSchema';
import { Paginated, Criteria, IdMongo } from '../../Utils/Types/typesMongoose';

interface INotificationRepository{
    getAll: (criteria :Criteria)=> Promise<Paginated<Notification>| null>,
    createNotification: (Notification: Notification)=> Promise<Notification | null>,
    getNotificationById: (NotificationId: IdMongo) => Promise<Notification | null>,
    updateNotification: (NotificationId:IdMongo, body: Partial<Notification>) => Promise<Notification | null>,
    deleteNotification: (NotificationId: IdMongo) => Promise<string>,
}

class NotificationRepository implements INotificationRepository{
    async getAll(criteria: Criteria):Promise<Paginated<Notification>| null> {
      let { limit = 30, page = 1 } = criteria;
      //@ts-ignore se vera luego...
      const notificationDocuments:PaginateResult<Notification> = await notificationSchema.paginate({}, { limit, page });
  
      if(!notificationDocuments) throw new Error('Notifications could not be accessed')
      if(!notificationDocuments.page) notificationDocuments.page = 1
  
      const mappedNotifications = notificationDocuments.docs.map((notification) => {
        return {
            _id:  notification._id,
            appointment_id:  notification.appointment_id,
            type: notification.type,
            state: notification.state,
            date_send: notification.date_send,
            note: notification.note
        }
      })
      return {
        docs: mappedNotifications ,
        totalDocs: notificationDocuments.totalDocs,
        limit: notificationDocuments.limit,
        totalPages:notificationDocuments.totalPages,
        pagingCounter: notificationDocuments.pagingCounter,
        hasPrevPage: notificationDocuments.hasPrevPage,
        hasNextPage: notificationDocuments.hasNextPage,
        page: notificationDocuments.page,
        prevPage: notificationDocuments.prevPage,
        nextPage: notificationDocuments.nextPage,
      };
    }
    async createNotification(body: Notification):Promise<Notification | null>{
      const newNotification :Notification = await notificationSchema.create(body)
      if(!newNotification) throw new Error('A problem occurred when the Notification was created')
        return {
            _id:  newNotification._id,
            appointment_id:  newNotification.appointment_id,
            type: newNotification.type,
            state: newNotification.state,
            date_send: newNotification.date_send,
            note: newNotification.note
        }
    }
    async getNotificationById(id: IdMongo):Promise<Notification|null>{
  
      const notification = await notificationSchema.findById(id)
      if(!notification) throw new Error('Notification could not found')
        return {
            _id:  notification._id,
            appointment_id:  notification.appointment_id,
            type: notification.type,
            state: notification.state,
            date_send: notification.date_send,
            note: notification.note
        }
    }
    async updateNotification(id: IdMongo, body :Partial<Notification>):Promise<Notification|null>{
      const updatedNotification = await notificationSchema.findByIdAndUpdate(id, body, 
        { new: true, runValidators: true })
      if(!updatedNotification) throw new Error('A problem occurred when the Notification was updated')
      
        return {
            _id:  updatedNotification._id,
            appointment_id:  updatedNotification.appointment_id,
            type: updatedNotification.type,
            state: updatedNotification.state,
            date_send: updatedNotification.date_send,
            note: updatedNotification.note
        }
    }
    async deleteNotification(id:IdMongo):Promise<string>{
      const notificationDeleted = await notificationSchema.findByIdAndDelete(id)
      if(!notificationDeleted) throw new Error('A problem occurred when the Notification was deleted')
        return `Notification with ID ${id} has been successfully deleted.`;
    }
  }
  export default NotificationRepository