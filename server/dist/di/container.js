"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="35e726aa-0547-5776-ae18-ce496da213b6")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
require("reflect-metadata");
const tsyringe_1 = require("tsyringe");
Object.defineProperty(exports, "container", { enumerable: true, get: function () { return tsyringe_1.container; } });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const userService_1 = require("../services/userService");
const userController_1 = require("../controllers/userController");
tsyringe_1.container.register('Bcrypt', { useValue: bcrypt_1.default });
tsyringe_1.container.register('Jwt', { useValue: jsonwebtoken_1.default });
tsyringe_1.container.register('JwtSecret', { useValue: process.env.JWT_SECRET || 'your_jwt_secret' });
tsyringe_1.container.register('UserModel', { useValue: User_1.default });
tsyringe_1.container.register(userService_1.UserService, { useClass: userService_1.UserService });
tsyringe_1.container.register(userController_1.UserController, { useClass: userController_1.UserController });
//# sourceMappingURL=container.js.map
//# debugId=35e726aa-0547-5776-ae18-ce496da213b6
