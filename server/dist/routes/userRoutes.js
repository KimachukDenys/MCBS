"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="b9e80fd4-c064-5317-8322-49dc803774e2")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const container_1 = require("../di/container");
const userController_1 = require("../controllers/userController");
const doctorController_1 = require("../controllers/doctorController");
const doctorService_1 = require("../services/doctorService");
const auth_1 = require("../middlwares/auth");
const upload_1 = require("../middlwares/upload");
const router = express_1.default.Router();
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
const userController = container_1.container.resolve(userController_1.UserController);
const doctorService = new doctorService_1.DoctorService();
const doctorController = new doctorController_1.DoctorController(doctorService);
router.post('/register', asyncHandler(userController.registerUser));
router.post('/login', asyncHandler(userController.loginUser));
router.get('/profile/:id', auth_1.authenticateToken, asyncHandler(userController.getUserProfile));
router.put('/profile/:id', auth_1.authenticateToken, upload_1.uploadImage, asyncHandler(userController.editUserProfile));
router.get('/doctors', doctorController.getAllDoctors);
router.get('/doctor/profile/:doctorId', doctorController.getDoctorProfile);
router.post('/doctor/profile/create', auth_1.authenticateToken, (0, auth_1.authorizeRole)(['doctor']), doctorController.createDoctorProfile);
router.put('/doctor/profile/edit/:userId', auth_1.authenticateToken, (0, auth_1.authorizeRole)(['doctor']), doctorController.updateDoctorProfile);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map
//# debugId=b9e80fd4-c064-5317-8322-49dc803774e2
