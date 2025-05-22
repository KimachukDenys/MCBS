"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="bd80e657-0586-5d99-bdfd-e146ac9d89d9")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const Service_1 = __importDefault(require("./Service"));
const User_1 = __importDefault(require("./User"));
class ServiceDoctor extends sequelize_1.Model {
}
ServiceDoctor.init({
    serviceId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Service_1.default,
            key: 'id',
        },
    },
    doctorId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User_1.default,
            key: 'id',
        },
    },
}, {
    sequelize: database_1.default,
    modelName: 'ServiceDoctor',
    tableName: 'service_doctors',
    timestamps: true,
});
exports.default = ServiceDoctor;
//# sourceMappingURL=ServiceDoctor.js.map
//# debugId=bd80e657-0586-5d99-bdfd-e146ac9d89d9
