"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="d41dc70c-77ed-559b-83f5-fb379d2888a4")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("./instrument");
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const errorHandler_1 = require("./middlwares/errorHandler");
const serviceRoutes_1 = __importDefault(require("./routes/serviceRoutes"));
const reviewRoutes_1 = __importDefault(require("./routes/reviewRoutes"));
const categoryRoutes_1 = __importDefault(require("./routes/categoryRoutes"));
const path_1 = __importDefault(require("path"));
const Sentry = require("@sentry/node");
Sentry.init({
    dsn: "https://a9a7794dda685872fb15413536889606@o4509362786795520.ingest.de.sentry.io/4509362790465616",
    release: "medical-clinic@1.0.0",
    sendDefaultPii: true,
});
const app = (0, express_1.default)();
// Мідлвари
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
// Налаштування для доступу до папки images
app.use('/images', express_1.default.static(path_1.default.join(__dirname, '../images')));
// Роутер
app.use('/api/users', userRoutes_1.default);
app.use('/api/services', serviceRoutes_1.default);
app.use('/api/categories', categoryRoutes_1.default);
app.use('/api/reviews', reviewRoutes_1.default);
// 404
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});
// 400 404 409 500
app.use(errorHandler_1.errorHandler);
Sentry.setupExpressErrorHandler(app);
exports.default = app;
//# sourceMappingURL=app.js.map
//# debugId=d41dc70c-77ed-559b-83f5-fb379d2888a4
