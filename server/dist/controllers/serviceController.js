"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="77695bb0-e28a-5c4c-a9f0-8c4d133f6f9c")}catch(e){}}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceController = void 0;
const upload_1 = require("../middlwares/upload");
class ServiceController {
    constructor(serviceService) {
        this.serviceService = serviceService;
        this.createService = [
            upload_1.uploadImage,
            async (req, res, next) => {
                try {
                    const { title, description, price, categoryId } = req.body;
                    const imagePath = req.file ? `images/${req.file.filename}` : null;
                    const newService = await this.serviceService.createService({ title, description, price, categoryId, imagePath });
                    res.status(201).json(newService);
                }
                catch (err) {
                    next(err);
                }
            }
        ];
        this.getAllServices = async (req, res, next) => {
            try {
                const includeHidden = req.query.includeHidden === 'true';
                const services = await this.serviceService.getAllServices(includeHidden);
                res.status(200).json(services);
            }
            catch (error) {
                next(error);
            }
        };
        this.getServiceById = async (req, res, next) => {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                res.status(400).json({ message: 'Invalid service id' });
                return;
            }
            try {
                const service = await this.serviceService.getServiceById(id);
                if (!service) {
                    res.status(404).json({ message: 'Сервіс не знайдено' });
                    return;
                }
                res.json(service);
            }
            catch (error) {
                next(error);
            }
        };
        this.getServicesForDoctor = async (req, res, next) => {
            const doctorId = Number(req.params.id);
            if (isNaN(doctorId)) {
                res.status(400).json({ message: 'Invalid doctorId' });
                return;
            }
            try {
                const services = await this.serviceService.getServicesForDoctor(doctorId);
                if (!services) {
                    res.status(404).json({ message: 'Doctor not found or has no services' });
                    return;
                }
                res.json(services);
            }
            catch (error) {
                next(error);
            }
        };
        this.updateService = [
            upload_1.uploadImage,
            async (req, res, next) => {
                const id = parseInt(req.params.id, 10);
                if (isNaN(id)) {
                    res.status(400).json({ message: 'Invalid service id' });
                    return;
                }
                const { title, description, price, categoryId, isHidden } = req.body;
                try {
                    const imagePath = req.file ? `images/${req.file.filename}` : undefined;
                    const updatedService = await this.serviceService.updateService(id, {
                        title,
                        description,
                        price,
                        categoryId,
                        isHidden,
                        imagePath,
                    });
                    if (!updatedService) {
                        res.status(404).json({ message: 'Сервіс не знайдено.' });
                        return;
                    }
                    res.json(updatedService);
                }
                catch (err) {
                    next(err);
                }
            }
        ];
    }
}
exports.ServiceController = ServiceController;
//# sourceMappingURL=serviceController.js.map
//# debugId=77695bb0-e28a-5c4c-a9f0-8c4d133f6f9c
