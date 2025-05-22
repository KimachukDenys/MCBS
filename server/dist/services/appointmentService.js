"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="a9df1c09-6808-5fdb-ba30-7ce4d626ed24")}catch(e){}}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentService = void 0;
const sequelize_1 = require("sequelize");
const models_1 = require("../models");
const allowedStatuses = ['pending', 'confirmed', 'finished', 'cancelled'];
class AppointmentService {
    async createAppointment(patientId, doctorId, serviceId, date) {
        return models_1.Appointment.create({
            patientId,
            doctorId,
            serviceId,
            date,
            status: 'pending', // Явне приведення типу
        });
    }
    async updateAppointment(id, user, updates) {
        const appointment = await models_1.Appointment.findByPk(id, {
            include: [
                { model: models_1.User, as: 'doctor' },
                { model: models_1.User, as: 'patient' }
            ]
        });
        if (!appointment) {
            throw new Error('NotFound');
        }
        if (user.role === 'admin') {
            if (updates.date)
                appointment.date = updates.date;
            if (updates.status && allowedStatuses.includes(updates.status)) {
                appointment.status = updates.status;
            }
        }
        else if (user.role === 'doctor' && user.id === appointment.doctorId) {
            if (updates.status && allowedStatuses.includes(updates.status)) {
                appointment.status = updates.status;
            }
            else if (updates.status) {
                throw new Error('Forbidden');
            }
        }
        else if (user.role === 'patient' && user.id === appointment.patientId) {
            if (updates.date)
                appointment.date = updates.date;
        }
        else {
            throw new Error('Forbidden');
        }
        await appointment.save();
        return appointment;
    }
    async getAllAppointments(user) {
        const where = {};
        if (user.role === 'doctor') {
            where.doctorId = user.id;
        }
        else if (user.role === 'patient') {
            where.patientId = user.id;
        }
        const appointments = await models_1.Appointment.findAll({
            where,
            include: [
                { model: models_1.User, as: 'doctor', attributes: ['firstName', 'lastName'] },
                { model: models_1.User, as: 'patient', attributes: ['firstName', 'lastName'] },
                { model: models_1.Service }
            ]
        });
        const now = new Date();
        for (const appointment of appointments) {
            const appointmentDate = new Date(appointment.date);
            let newStatus = null;
            if (appointmentDate < now && appointment.status !== 'finished') {
                newStatus = 'finished';
            }
            else if (appointmentDate.toDateString() === now.toDateString() &&
                appointment.status === 'pending') {
                newStatus = 'confirmed';
            }
            if (newStatus) {
                appointment.status = newStatus;
                await appointment.save();
            }
        }
        return appointments;
    }
    async getAppointmentById(id, user) {
        const appointment = await models_1.Appointment.findByPk(id, {
            include: [
                { model: models_1.User, as: 'doctor', attributes: ['firstName', 'lastName'] },
                { model: models_1.User, as: 'patient', attributes: ['firstName', 'lastName'] },
                { model: models_1.Service },
            ],
        });
        if (!appointment) {
            throw new Error('NotFound');
        }
        if (user.role === 'doctor' && appointment.doctorId !== user.id) {
            throw new Error('Forbidden');
        }
        if (user.role === 'patient' && appointment.patientId !== user.id) {
            throw new Error('Forbidden');
        }
        return appointment;
    }
    async getBookedTimes(doctorId, dateStr, serviceId) {
        const start = new Date(dateStr);
        const end = new Date(dateStr);
        end.setHours(23, 59, 59, 999);
        const where = {
            doctorId,
            date: { [sequelize_1.Op.between]: [start, end] },
        };
        if (serviceId) {
            where.serviceId = serviceId;
        }
        const appointments = await models_1.Appointment.findAll({ where });
        return appointments.map(a => new Date(a.date).toTimeString().slice(0, 5));
    }
    async deleteAppointment(id, user) {
        const appointment = await models_1.Appointment.findByPk(id);
        if (!appointment) {
            throw new Error('NotFound');
        }
        if (user.role !== 'admin' &&
            appointment.patientId !== user.id &&
            appointment.doctorId !== user.id) {
            throw new Error('Forbidden');
        }
        await appointment.destroy();
    }
}
exports.AppointmentService = AppointmentService;
//# sourceMappingURL=appointmentService.js.map
//# debugId=a9df1c09-6808-5fdb-ba30-7ce4d626ed24
