"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="6cc01035-0cb3-55d0-bd2e-a51f318d6570")}catch(e){}}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentController = void 0;
class AppointmentController {
    constructor(appointmentService) {
        this.appointmentService = appointmentService;
        this.createAppointment = async (req, res, next) => {
            if (!req.user) {
                res.status(401).json({ message: 'Unauthorized: user not found' });
                return;
            }
            try {
                const { doctorId, serviceId, date } = req.body;
                const newAppointment = await this.appointmentService.createAppointment(req.user.id, doctorId, serviceId, new Date(date));
                res.status(201).json(newAppointment);
            }
            catch (error) {
                next(error);
            }
        };
        this.updateAppointment = async (req, res, next) => {
            try {
                const id = parseInt(req.params.id, 10);
                const { date, status } = req.body;
                const updated = await this.appointmentService.updateAppointment(id, req.user, {
                    date: date ? new Date(date) : undefined,
                    status,
                });
                res.status(200).json({ message: 'Бронювання успішно оновлено.', updated });
            }
            catch (error) {
                next(error);
            }
        };
        this.getAllAppointments = async (req, res, next) => {
            try {
                const appointments = await this.appointmentService.getAllAppointments(req.user);
                res.status(200).json(appointments);
            }
            catch (error) {
                next(error);
            }
        };
        this.getAppointmentById = async (req, res, next) => {
            try {
                const id = parseInt(req.params.id, 10);
                const appointment = await this.appointmentService.getAppointmentById(id, req.user);
                res.json(appointment);
            }
            catch (error) {
                next(error);
            }
        };
        this.getBookedTimes = async (req, res, next) => {
            try {
                const doctorId = parseInt(String(req.query.doctorId), 10);
                const dateStr = String(req.query.date);
                const serviceId = req.query.serviceId ? parseInt(String(req.query.serviceId), 10) : undefined;
                if (isNaN(doctorId) || !dateStr) {
                    res.status(400).json({ message: 'Missing or invalid doctorId or date parameter' });
                    return;
                }
                const times = await this.appointmentService.getBookedTimes(doctorId, dateStr, serviceId);
                res.json(times);
            }
            catch (error) {
                next(error);
            }
        };
        this.deleteAppointment = async (req, res, next) => {
            try {
                const id = parseInt(req.params.id, 10);
                await this.appointmentService.deleteAppointment(id, req.user);
                res.json({ message: 'Бронювання успішно видалено' });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.AppointmentController = AppointmentController;
//# sourceMappingURL=appointmentController.js.map
//# debugId=6cc01035-0cb3-55d0-bd2e-a51f318d6570
