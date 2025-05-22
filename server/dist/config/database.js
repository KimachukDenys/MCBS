"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="ef672e63-fb1e-579e-a053-cddfbfe16cec")}catch(e){}}();

Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('clinic_db', 'admin_k', '123456', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
});
exports.default = sequelize;
//# sourceMappingURL=database.js.map
//# debugId=ef672e63-fb1e-579e-a053-cddfbfe16cec
