"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="6a3d6d14-3abc-5132-807a-4021a62c3f56")}catch(e){}}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorService = void 0;
const models_1 = require("../models");
class DoctorService {
    /* ---------- лікарі ⇄ сервіси ---------- */
    async assignDoctorToService(serviceId, doctorId) {
        const service = await models_1.Service.findByPk(serviceId);
        if (!service)
            throw new Error('NotFound:Service');
        const doctor = await models_1.User.findByPk(doctorId);
        if (!doctor || doctor.role !== 'doctor')
            throw new Error('Validation:Doctor');
        await service.addDoctor(doctor);
    }
    async removeDoctorFromService(serviceId, doctorId) {
        const service = await models_1.Service.findByPk(serviceId);
        if (!service)
            throw new Error('NotFound:Service');
        const doctor = await models_1.User.findByPk(doctorId);
        if (!doctor || doctor.role !== 'doctor')
            throw new Error('Validation:Doctor');
        await service.removeDoctor(doctor);
    }
    async getDoctorsForService(serviceId) {
        const service = await models_1.Service.findByPk(serviceId, {
            include: [
                {
                    model: models_1.User,
                    as: 'doctors',
                    where: { role: 'doctor' },
                    required: false,
                },
            ],
        });
        if (!service)
            throw new Error('NotFound:Service');
        return service.doctors ?? [];
    }
    async getAllDoctors() {
        return models_1.User.findAll({
            where: { role: 'doctor' },
            attributes: ['id', 'firstName', 'lastName', 'email', 'phone', 'photoUrl'],
            include: [{ model: models_1.DoctorProfile, as: 'profile' }],
        });
    }
    async createDoctorProfile(userId, data) {
        const user = await models_1.User.findByPk(userId);
        if (!user || user.role !== 'doctor')
            throw new Error('NotFound:Doctor');
        const exists = await models_1.DoctorProfile.findOne({ where: { userId } });
        if (exists)
            throw new Error('Conflict:Profile');
        return models_1.DoctorProfile.create({ userId, ...data });
    }
    async updateDoctorProfile(userId, data) {
        const profile = await models_1.DoctorProfile.findOne({ where: { userId } });
        if (!profile)
            throw new Error('NotFound:Profile');
        Object.assign(profile, {
            education: data.education ?? profile.education,
            experience: data.experience ?? profile.experience,
            bio: data.bio ?? profile.bio,
            specialization: data.specialization ?? profile.specialization,
            price: data.price ?? profile.price,
        });
        await profile.save();
        return profile;
    }
    async getDoctorProfile(doctorId) {
        if (isNaN(doctorId))
            throw new Error('Validation:doctorId');
        const user = await models_1.User.findOne({
            where: { id: doctorId, role: 'doctor' },
            attributes: ['id', 'firstName', 'lastName', 'email', 'phone', 'photoUrl'],
            include: [
                { model: models_1.DoctorProfile, as: 'profile' },
                { model: models_1.Service, as: 'services', through: { attributes: [] } },
            ],
        });
        if (!user)
            throw new Error('NotFound:Doctor');
        return user;
    }
}
exports.DoctorService = DoctorService;
//# sourceMappingURL=doctorService.js.map
//# debugId=6a3d6d14-3abc-5132-807a-4021a62c3f56
