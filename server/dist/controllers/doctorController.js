"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="ec1ec9ed-bca5-5aa9-b201-0165b3dc58a9")}catch(e){}}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorController = void 0;
class DoctorController {
    constructor(doctorService) {
        this.doctorService = doctorService;
        this.assignDoctorToService = async (req, res, next) => {
            try {
                await this.doctorService.assignDoctorToService(+req.params.id, req.body.doctorId);
                res.status(200).json({ message: 'Доктора успішно додано до сервісу' });
            }
            catch (e) {
                next(e);
            }
        };
        this.removeDoctorFromService = async (req, res, next) => {
            try {
                await this.doctorService.removeDoctorFromService(+req.params.id, +req.params.doctorId);
                res.status(200).json({ message: 'Доктора успішно видалено із сервісу' });
            }
            catch (e) {
                next(e);
            }
        };
        this.getDoctorsForService = async (req, res, next) => {
            try {
                const doctors = await this.doctorService.getDoctorsForService(+req.params.id);
                res.status(200).json(doctors);
            }
            catch (e) {
                next(e);
            }
        };
        this.getAllDoctors = async (_req, res, next) => {
            try {
                const doctors = await this.doctorService.getAllDoctors();
                for (const doctor of doctors) {
                    if (doctor.profile) {
                        const rating = await doctor.profile.calculateRating();
                        doctor.profile.setDataValue('rating', rating);
                    }
                }
                res.status(200).json(doctors);
            }
            catch (e) {
                next(e);
            }
        };
        this.createDoctorProfile = async (req, res, next) => {
            try {
                const profile = await this.doctorService.createDoctorProfile(req.user.id, req.body);
                res.status(201).json(profile);
            }
            catch (e) {
                next(e);
            }
        };
        this.updateDoctorProfile = async (req, res, next) => {
            try {
                const profile = await this.doctorService.updateDoctorProfile(+req.params.userId, req.body);
                res.status(200).json(profile);
            }
            catch (e) {
                next(e);
            }
        };
        this.getDoctorProfile = async (req, res, next) => {
            try {
                const doctor = await this.doctorService.getDoctorProfile(+req.params.doctorId);
                res.status(200).json(doctor);
            }
            catch (e) {
                next(e);
            }
        };
    }
}
exports.DoctorController = DoctorController;
//# sourceMappingURL=doctorController.js.map
//# debugId=ec1ec9ed-bca5-5aa9-b201-0165b3dc58a9
