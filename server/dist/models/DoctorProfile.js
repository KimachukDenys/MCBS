"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="b25a520b-c343-5698-a850-3ad22cf54f91")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const User_1 = __importDefault(require("./User"));
const Review_1 = __importDefault(require("./Review"));
const Appointment_1 = __importDefault(require("./Appointment"));
class DoctorProfile extends sequelize_1.Model {
}
DoctorProfile.init({
    id: { type: sequelize_1.DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: { model: User_1.default, key: 'id' },
    },
    education: { type: sequelize_1.DataTypes.TEXT, allowNull: true },
    experience: { type: sequelize_1.DataTypes.TEXT, allowNull: true },
    bio: { type: sequelize_1.DataTypes.TEXT, allowNull: true },
    specialization: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Лікар',
    },
    price: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: { min: 0 },
    },
    rating: {
        type: sequelize_1.DataTypes.VIRTUAL,
        get() {
            return this.getDataValue('rating') ?? null;
        },
    },
}, {
    sequelize: database_1.default,
    modelName: 'DoctorProfile',
    tableName: 'doctor_profiles',
    timestamps: true,
    defaultScope: {
        attributes: { include: ['rating'] },
    },
});
DoctorProfile.prototype.calculateRating = async function () {
    const reviews = await Review_1.default.findAll({
        include: [
            {
                model: Appointment_1.default,
                as: 'appointment',
                attributes: [],
                where: { doctorId: this.userId },
            },
        ],
    });
    if (reviews.length === 0)
        return null;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return sum / reviews.length;
};
DoctorProfile.afterFind(async (result) => {
    const profiles = result
        ? Array.isArray(result)
            ? Array.from(result) // робимо мутабельний масив
            : [result]
        : [];
    for (const profile of profiles) {
        const avg = await profile.calculateRating();
        profile.setDataValue('rating', avg);
    }
});
exports.default = DoctorProfile;
//# sourceMappingURL=DoctorProfile.js.map
//# debugId=b25a520b-c343-5698-a850-3ad22cf54f91
