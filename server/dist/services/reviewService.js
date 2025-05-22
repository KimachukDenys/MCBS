"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="48fad805-7d9e-5a78-8bb4-43594df18bda")}catch(e){}}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewService = void 0;
const models_1 = require("../models");
class ReviewService {
    async getUserReviews(userId) {
        return models_1.Review.findAll({
            where: { userId },
            include: [
                {
                    model: models_1.Appointment,
                    as: 'appointment', // використовуйте as, якщо ви вказали alias
                    include: [
                        { model: models_1.Service, },
                        { model: models_1.User, as: 'doctor', attributes: ['firstName', 'lastName'] }
                    ]
                }
            ]
        });
    }
    async hasUserReviewedAppointment(appointmentId, userId) {
        const review = await models_1.Review.findOne({
            where: { appointmentId, userId },
        });
        return !!review;
    }
    async createReview(data) {
        const appointment = await models_1.Appointment.findByPk(data.appointmentId);
        if (!appointment)
            throw new Error('NotFound:Appointment not found');
        if (appointment.status !== 'finished') {
            throw new Error('Validation:Ви можете залишати відгуки, якщо ваш запис завершився!');
        }
        const alreadyReviewed = await this.hasUserReviewedAppointment(data.appointmentId, data.userId);
        if (alreadyReviewed) {
            throw new Error('Validation:Ви вже залишили відгук на це бронювання!');
        }
        return await models_1.Review.create(data);
    }
    async updateReview(id, data) {
        const review = await models_1.Review.findByPk(id);
        if (!review)
            throw new Error('NotFound:Review not found');
        review.rating = data.rating ?? review.rating;
        review.comment = data.comment ?? review.comment;
        return await review.save();
    }
    async deleteReview(id) {
        const review = await models_1.Review.findByPk(id);
        if (!review)
            throw new Error('NotFound:Review not found');
        await review.destroy();
    }
    async getDoctorReviews(doctorId) {
        return await models_1.Review.findAll({
            include: [
                {
                    model: models_1.Appointment,
                    as: 'appointment',
                    where: { doctorId },
                    attributes: ['serviceId'],
                    include: [{ model: models_1.Service, attributes: ['title'] }],
                },
                {
                    model: models_1.User,
                    as: 'author',
                    attributes: ['firstName', 'lastName'],
                },
            ],
            order: [['createdAt', 'DESC']],
        });
    }
    async getServiceReviews(serviceId) {
        return await models_1.Review.findAll({
            include: [
                {
                    model: models_1.Appointment,
                    as: 'appointment',
                    where: { serviceId },
                    attributes: ['doctorId'],
                    include: [{ model: models_1.User, as: 'doctor', attributes: ['firstName', 'lastName'] }],
                },
                {
                    model: models_1.User,
                    as: 'author',
                    attributes: ['firstName', 'lastName'],
                },
            ],
            order: [['createdAt', 'DESC']],
        });
    }
}
exports.ReviewService = ReviewService;
//# sourceMappingURL=reviewService.js.map
//# debugId=48fad805-7d9e-5a78-8bb4-43594df18bda
