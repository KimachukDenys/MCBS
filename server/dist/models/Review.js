"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="b57dc859-7bd8-5f93-8e36-46358fae0453")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Review extends sequelize_1.Model {
}
Review.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    appointmentId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'appointments', key: 'id' }
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' }
    },
    rating: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 1, max: 5 },
    },
    comment: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    }
}, {
    sequelize: database_1.default,
    modelName: 'Review',
    tableName: 'reviews',
    timestamps: true,
});
exports.default = Review;
//# sourceMappingURL=Review.js.map
//# debugId=b57dc859-7bd8-5f93-8e36-46358fae0453
