"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="06060359-0246-519f-93cd-921faa2ae991")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const Categories_1 = __importDefault(require("./Categories"));
class Service extends sequelize_1.Model {
}
Service.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    imagePath: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    isHidden: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    categoryId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Categories_1.default,
            key: 'id',
        },
    },
}, {
    sequelize: database_1.default,
    modelName: 'Service',
    tableName: 'services',
    timestamps: true,
});
exports.default = Service;
//# sourceMappingURL=Service.js.map
//# debugId=06060359-0246-519f-93cd-921faa2ae991
