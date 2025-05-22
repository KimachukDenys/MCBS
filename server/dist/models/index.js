"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="fcc1639e-6533-5ef3-b8b9-f34b31572c7d")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceDoctor = exports.DoctorProfile = exports.Review = exports.Appointment = exports.Category = exports.Service = exports.User = exports.sequelize = void 0;
const database_1 = __importDefault(require("../config/database"));
exports.sequelize = database_1.default;
const User_1 = __importDefault(require("./User"));
exports.User = User_1.default;
const Service_1 = __importDefault(require("./Service"));
exports.Service = Service_1.default;
const Categories_1 = __importDefault(require("./Categories"));
exports.Category = Categories_1.default;
const Appointment_1 = __importDefault(require("./Appointment"));
exports.Appointment = Appointment_1.default;
const Review_1 = __importDefault(require("./Review"));
exports.Review = Review_1.default;
const DoctorProfile_1 = __importDefault(require("./DoctorProfile"));
exports.DoctorProfile = DoctorProfile_1.default;
const ServiceDoctor_1 = __importDefault(require("./ServiceDoctor"));
exports.ServiceDoctor = ServiceDoctor_1.default;
// Асоціації
User_1.default.hasMany(Appointment_1.default, { foreignKey: 'patientId', as: 'appointments' });
User_1.default.hasMany(Appointment_1.default, { foreignKey: 'doctorId', as: 'appointmentsAsDoctor' });
Appointment_1.default.belongsTo(User_1.default, { foreignKey: 'patientId', as: 'patient' });
Appointment_1.default.belongsTo(User_1.default, { foreignKey: 'doctorId', as: 'doctor' });
Appointment_1.default.belongsTo(Service_1.default, { foreignKey: 'serviceId' });
Appointment_1.default.hasOne(Review_1.default, { foreignKey: 'appointmentId', as: 'review' });
Review_1.default.belongsTo(Appointment_1.default, { foreignKey: 'appointmentId', as: 'appointment' });
Review_1.default.belongsTo(User_1.default, { foreignKey: 'userId', as: 'author' });
User_1.default.hasMany(Review_1.default, { foreignKey: 'userId' });
Service_1.default.belongsTo(Categories_1.default, { foreignKey: 'categoryId', as: 'category' });
Categories_1.default.hasMany(Service_1.default, { foreignKey: 'categoryId', as: 'services' });
User_1.default.hasOne(DoctorProfile_1.default, { foreignKey: 'userId', as: 'profile' });
DoctorProfile_1.default.belongsTo(User_1.default, { foreignKey: 'userId' });
Service_1.default.belongsToMany(User_1.default, {
    through: ServiceDoctor_1.default,
    foreignKey: 'serviceId',
    otherKey: 'doctorId',
    as: 'doctors',
});
User_1.default.belongsToMany(Service_1.default, {
    through: ServiceDoctor_1.default,
    foreignKey: 'doctorId',
    otherKey: 'serviceId',
    as: 'services',
});
//# sourceMappingURL=index.js.map
//# debugId=fcc1639e-6533-5ef3-b8b9-f34b31572c7d
