"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="1cb7f9d1-3de1-5f02-b1c9-d577b14d24db")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/serviceRoutes.ts
const express_1 = __importDefault(require("express"));
const serviceController_1 = require("../controllers/serviceController");
const serviceService_1 = require("../services/serviceService");
const appointmentController_1 = require("../controllers/appointmentController");
const appointmentService_1 = require("../services/appointmentService");
const doctorController_1 = require("../controllers/doctorController");
const doctorService_1 = require("../services/doctorService");
const auth_1 = require("../middlwares/auth");
const router = express_1.default.Router();
const serviceService = new serviceService_1.ServiceService();
const serviceController = new serviceController_1.ServiceController(serviceService);
const appointmentService = new appointmentService_1.AppointmentService();
const appointmentController = new appointmentController_1.AppointmentController(appointmentService);
const doctorService = new doctorService_1.DoctorService();
const doctorController = new doctorController_1.DoctorController(doctorService);
router.get('/', serviceController.getAllServices);
router.get('/:id', serviceController.getServiceById);
router.post('/create', auth_1.authenticateToken, (0, auth_1.authorizeRole)(['admin']), serviceController.createService);
router.put('/update/:id', auth_1.authenticateToken, (0, auth_1.authorizeRole)(['admin']), serviceController.updateService);
router.post('/appointments', auth_1.authenticateToken, appointmentController.createAppointment);
router.get('/appointments/list', auth_1.authenticateToken, appointmentController.getAllAppointments);
router.get('/appointments/details/:id', auth_1.authenticateToken, appointmentController.getAppointmentById);
router.put('/appointments/update/:id', auth_1.authenticateToken, (0, auth_1.authorizeRole)(['doctor']), appointmentController.updateAppointment);
router.get('/appointments/booked', auth_1.authenticateToken, appointmentController.getBookedTimes);
router.delete('/appointments/:id', auth_1.authenticateToken, appointmentController.deleteAppointment);
router.post('/:id/add/doctors', auth_1.authenticateToken, (0, auth_1.authorizeRole)(['admin']), doctorController.assignDoctorToService);
router.delete('/:id/remove/doctors/:doctorId', auth_1.authenticateToken, (0, auth_1.authorizeRole)(['admin']), doctorController.removeDoctorFromService);
router.get('/:id/doctors', auth_1.authenticateToken, doctorController.getDoctorsForService);
router.get('/:id/services', auth_1.authenticateToken, serviceController.getServicesForDoctor);
exports.default = router;
//# sourceMappingURL=serviceRoutes.js.map
//# debugId=1cb7f9d1-3de1-5f02-b1c9-d577b14d24db
