"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="7d849267-5b79-54fc-91be-f26444a5042b")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reviewController_1 = require("../controllers/reviewController");
const reviewService_1 = require("../services/reviewService");
const auth_1 = require("../middlwares/auth");
const router = express_1.default.Router();
const reviewService = new reviewService_1.ReviewService();
const reviewController = new reviewController_1.ReviewController(reviewService);
router.get('/user/:userId', auth_1.authenticateToken, (0, auth_1.authorizeRole)(['patient']), reviewController.getUserReviews);
router.post('/create', auth_1.authenticateToken, (0, auth_1.authorizeRole)(['patient']), reviewController.createReview);
router.put('/update/:id', auth_1.authenticateToken, (0, auth_1.authorizeRole)(['patient']), reviewController.updateReview);
router.delete('/delete/:id', auth_1.authenticateToken, (0, auth_1.authorizeRole)(['patient', 'admin']), reviewController.deleteReview);
router.get('/doctor/:doctorId', reviewController.getDoctorReviews);
router.get('/service/:serviceId', reviewController.getServiceReviews);
exports.default = router;
//# sourceMappingURL=reviewRoutes.js.map
//# debugId=7d849267-5b79-54fc-91be-f26444a5042b
