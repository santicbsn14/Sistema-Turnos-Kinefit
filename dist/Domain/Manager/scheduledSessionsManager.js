import container from "../../container.js";
import idValidation from "../Validations/idValidation.js";
import createScheduledSessionsValidation from "../Validations/CreatesValidation/createScheduledSessions.js";
import mongoose from "mongoose";
import { isAvailable } from "../../Utils/scheduleUtils.js";
class ScheduledSessionsManager {
    constructor() {
        this.scheduledSessionsRepository = container.resolve('ScheduledSessionsRepository');
        this.professionalTimeSlotRepository = container.resolve('ProfessionalTimeSlotRepository');
    }
    async getAll(criteria) {
        return await this.scheduledSessionsRepository.getAll(criteria);
    }
    async getScheduledSessionsById(id) {
        let sid = new mongoose.Types.ObjectId(id);
        await idValidation.parseAsync(sid);
        return await this.scheduledSessionsRepository.getScheduledSessionsById(sid);
    }
    async createScheduledSessions(bodyDto) {
        let body = {
            ...bodyDto,
            pacient_id: new mongoose.Types.ObjectId(bodyDto.pacient_id),
            professional_id: new mongoose.Types.ObjectId(bodyDto.professional_id),
            state: 'Pending',
            next_date: new Date(bodyDto.start_date)
        };
        await createScheduledSessionsValidation.parseAsync(body);
        let proTimeSlots = await this.professionalTimeSlotRepository.getProfessionalTimeSlotsByPro(body.professional_id);
        if (!proTimeSlots)
            throw new Error('Professional not found');
        const isAvailableSlot = isAvailable(proTimeSlots.schedule, body.session_dates);
        if (!isAvailableSlot)
            throw new Error('The professional is not work in that times');
    }
    async updateScheduledSessions(body, id) {
        await idValidation.parseAsync(id);
        return await this.scheduledSessionsRepository.updateScheduledSessions(body, id);
    }
    async deleteScheduledSessions(id) {
        await idValidation.parseAsync(id);
        return await this.scheduledSessionsRepository.deleteScheduledSessions(id);
    }
}
export default ScheduledSessionsManager;
