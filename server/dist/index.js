"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="43e6050b-9405-57ed-990d-4e28351a32e1")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const models_1 = require("./models");
const PORT = process.env.PORT || 5000;
(async () => {
    try {
        await models_1.sequelize.authenticate();
        console.log('✅ DB connected');
        await models_1.sequelize.sync({ alter: true });
        app_1.default.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error('❌ Unable to connect to DB:', error);
    }
})();
//# sourceMappingURL=index.js.map
//# debugId=43e6050b-9405-57ed-990d-4e28351a32e1
