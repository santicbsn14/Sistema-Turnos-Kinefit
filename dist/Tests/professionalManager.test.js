import ProfessionalManager from 'Source/Domain/Manager/professionalManager';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import mongoose from 'mongoose';
const mockProfessionalRepository = {
    getAll: vi.fn().mockResolvedValue([]), // Mock de respuesta para getAll
    getProfessionalById: vi.fn(),
    createProfessional: vi.fn(),
    updateProfessional: vi.fn(),
    deleteProfessional: vi.fn()
};
vi.mock('../container', () => ({
    default: {
        resolve: vi.fn(() => mockProfessionalRepository)
    }
}));
describe('ProfessionalManager', () => {
    let professionalManager;
    beforeEach(() => {
        professionalManager = new ProfessionalManager();
        vi.clearAllMocks();
    });
    describe('getAll', () => {
        it('should call professionalRepository.getAll with valid data', async () => {
            const criteria = { page: 1, limit: 10 };
            await professionalManager.getAll(criteria);
            expect(mockProfessionalRepository.getAll).toHaveBeenCalledWith(criteria);
        });
    });
    describe('getProfessionalById', () => {
        it('should call professionalRepository.getProfessionalById with valid data', async () => {
            let pid = new mongoose.Types.ObjectId();
            await professionalManager.getProfessionalById(pid);
            expect(mockProfessionalRepository.getProfessionalById).toHaveBeenCalledWith(pid);
        });
        it('should throw an error with invalid id', async () => {
            const invalidId = 'invalid-id';
            // @ts-ignore porfa
            await expect(professionalManager.getProfessionalById(invalidId)).rejects.toThrow();
        });
    });
    describe('createProfessional', () => {
        it('should call professionalRepository.createProfessional with valid data', async () => {
            let uid = new mongoose.Types.ObjectId();
            // @ts-ignore entorno de testing
            await professionalManager.createProfessional(uid);
            expect(mockProfessionalRepository.createProfessional).toHaveBeenCalledWith(uid);
        });
        it('should throw an error with invalid id', async () => {
            const invalidId = 'invalid-id';
            // @ts-ignore porfa
            await expect(professionalManager.createProfessional(invalidId)).rejects.toThrow();
        });
    });
    describe('updateProfessional', () => {
        it('should call professionalRepository.updateProfessional with valid data', async () => {
            let uid = new mongoose.Types.ObjectId();
            let pid = { user_id: new mongoose.Types.ObjectId(), _id: uid };
            await professionalManager.updateProfessional(pid, uid);
            expect(mockProfessionalRepository.updateProfessional).toHaveBeenCalledWith(pid, uid);
        });
        it('should throw an error with invalid id', async () => {
            const invalidId = 'invalid-id';
            // @ts-ignore porfa
            await expect(professionalManager.updateProfessional(invalidId)).rejects.toThrow();
        });
    });
    describe('updateProfessional', () => {
        it('should call professionalRepository.deleteProfessional with valid data', async () => {
            let uid = new mongoose.Types.ObjectId();
            let pid = { user_id: new mongoose.Types.ObjectId(), _id: uid };
            await professionalManager.deleteProfessional(pid.user_id);
            expect(mockProfessionalRepository.deleteProfessional).toHaveBeenCalledWith(pid.user_id);
        });
        it('should throw an error with invalid id', async () => {
            const invalidId = 'invalid-id';
            // @ts-ignore porfa
            await expect(professionalManager.deleteProfessional(invalidId)).rejects.toThrow();
        });
    });
});
