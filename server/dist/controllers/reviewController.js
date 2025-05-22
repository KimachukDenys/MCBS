"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="46be4e8d-8bc6-5d0f-bbb7-6ef59dd57cfb")}catch(e){}}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewController = void 0;
class ReviewController {
    constructor(reviewService) {
        this.reviewService = reviewService;
        this.getUserReviews = async (req, res, next) => {
            try {
                const userId = +req.params.userId;
                const reviews = await this.reviewService.getUserReviews(userId);
                res.json(reviews);
            }
            catch (error) {
                next(error);
            }
        };
        this.createReview = async (req, res, next) => {
            try {
                const { appointmentId, rating, comment, userId } = req.body;
                const review = await this.reviewService.createReview({ appointmentId, userId, rating, comment });
                res.status(201).json(review);
            }
            catch (error) {
                next(error);
            }
        };
        this.updateReview = async (req, res, next) => {
            try {
                const id = +req.params.id;
                const { rating, comment } = req.body;
                const review = await this.reviewService.updateReview(id, { rating, comment });
                res.status(200).json(review);
            }
            catch (error) {
                next(error);
            }
        };
        this.deleteReview = async (req, res, next) => {
            try {
                const id = +req.params.id;
                await this.reviewService.deleteReview(id);
                res.status(204).send();
            }
            catch (error) {
                next(error);
            }
        };
        this.getDoctorReviews = async (req, res, next) => {
            try {
                const doctorId = +req.params.doctorId;
                const reviews = await this.reviewService.getDoctorReviews(doctorId);
                res.json(reviews);
            }
            catch (error) {
                next(error);
            }
        };
        this.getServiceReviews = async (req, res, next) => {
            try {
                const serviceId = +req.params.serviceId;
                const reviews = await this.reviewService.getServiceReviews(serviceId);
                res.json(reviews);
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.ReviewController = ReviewController;
//# sourceMappingURL=reviewController.js.map
//# debugId=46be4e8d-8bc6-5d0f-bbb7-6ef59dd57cfb
