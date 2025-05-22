"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="151c17a9-7065-5bac-994c-f5c2cb1757de")}catch(e){}}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceService = void 0;
const models_1 = require("../models");
class ServiceService {
    async createService(data) {
        return await models_1.Service.create({
            title: data.title,
            description: data.description,
            price: data.price,
            categoryId: data.categoryId,
            imagePath: data.imagePath || null,
            isHidden: false,
        });
    }
    async getAllServices(includeHidden) {
        return await models_1.Service.findAll({
            where: includeHidden ? {} : { isHidden: false },
            include: [
                {
                    model: models_1.Category,
                    as: 'category',
                    attributes: ['id', 'name'],
                },
            ],
        });
    }
    async getServiceById(id) {
        return await models_1.Service.findByPk(id);
    }
    async getServicesForDoctor(doctorId) {
        const doctor = await models_1.User.findByPk(doctorId, {
            include: {
                model: models_1.Service,
                as: 'services',
                through: { attributes: [] },
            },
        });
        return doctor?.services || null;
    }
    async updateService(id, updateData) {
        const service = await models_1.Service.findByPk(id);
        if (!service)
            return null;
        await service.update(updateData);
        return service;
    }
}
exports.ServiceService = ServiceService;
//# sourceMappingURL=serviceService.js.map
//# debugId=151c17a9-7065-5bac-994c-f5c2cb1757de
