import dotenv from 'dotenv';
dotenv.config();
import { createContainer, asClass, Lifetime } from 'awilix';
import UserRepository from './Data/Repositories/userMongooseRepository.js';
import ProfessionalRepository from './Data/Repositories/professionalMongooseRepository.js';
import PatientRepository from './Data/Repositories/patientMongooseRepository.js';
import NotificationRepository from './Data/Repositories/notificationMongooseRepository.js';
import AppointmentRepository from './Data/Repositories/appointmentMoongooseRepository.js';
import ProfessionalTimesSlotsRepository from './Data/Repositories/proTimeSlotsMongooseRepository.js';
import MedicalRecordRepository from './Data/Repositories/medicalRecMongooseRepository.js';
import DailyHourAvailabilityRepository from './Data/Repositories/dailyHourARepositoryMongoose.js';
import RoleMongooseRepository from './Data/Repositories/roleMoongoseRepository.js';
const container = createContainer();
container.register({
    UserRepository: asClass(UserRepository, { lifetime: Lifetime.SINGLETON }),
    ProfessionalRepository: asClass(ProfessionalRepository, { lifetime: Lifetime.SINGLETON }),
    PatientRepository: asClass(PatientRepository, { lifetime: Lifetime.SINGLETON }),
    NotificationRepository: asClass(NotificationRepository, { lifetime: Lifetime.SINGLETON }),
    AppointmentRepository: asClass(AppointmentRepository, { lifetime: Lifetime.SINGLETON }),
    ProfessionalTimeSlotsRepository: asClass(ProfessionalTimesSlotsRepository, { lifetime: Lifetime.SINGLETON }),
    MedicalRecordRepository: asClass(MedicalRecordRepository, { lifetime: Lifetime.SINGLETON }),
    DailyHourAvailabilityRepository: asClass(DailyHourAvailabilityRepository, { lifetime: Lifetime.SINGLETON }),
    RoleRepository: asClass(RoleMongooseRepository, { lifetime: Lifetime.SINGLETON })
});
export default container;
