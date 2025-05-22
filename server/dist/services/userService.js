"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="b8ee48a5-f381-5366-8482-ec1604b10829")}catch(e){}}();

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const tsyringe_1 = require("tsyringe");
const sequelize_1 = require("sequelize");
let UserService = class UserService {
    constructor(bcrypt, jwt, jwtSecret, UserModel) {
        this.bcrypt = bcrypt;
        this.jwt = jwt;
        this.jwtSecret = jwtSecret;
        this.UserModel = UserModel;
    }
    /* ---------- register ---------- */
    async registerUser(data) {
        const { firstName, lastName, email, phone, password, gender } = data;
        if (!firstName || !lastName || !email || !phone || !password || !gender) {
            throw new Error('ValidationError: All fields are required');
        }
        if (!['male', 'female'].includes(gender)) {
            throw new Error('ValidationError: Invalid gender value');
        }
        const existingUser = await this.UserModel.findOne({
            where: { [sequelize_1.Op.or]: [{ email }, { phone }] },
        });
        if (existingUser) {
            throw new Error('ConflictError: User with this email or phone already exists');
        }
        const hashedPassword = await this.bcrypt.hash(password, 10);
        const newUser = await this.UserModel.create({
            firstName, lastName, email, phone, gender,
            password: hashedPassword, role: 'patient',
        });
        return {
            id: newUser.id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            phone: newUser.phone,
            gender: newUser.gender,
            role: newUser.role,
        };
    }
    /* ---------- login ---------- */
    async loginUser(email, password) {
        const user = await this.UserModel.findOne({ where: { email } });
        if (!user)
            throw new Error('AuthError: Invalid email or password');
        const isMatch = await this.bcrypt.compare(password, user.password);
        if (!isMatch)
            throw new Error('AuthError: Invalid email or password');
        const token = this.jwt.sign({ id: user.id, role: user.role, firstName: user.firstName, lastName: user.lastName }, this.jwtSecret, { expiresIn: '1d' });
        return {
            token,
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                firstName: user.firstName,
                lastName: user.lastName,
            },
        };
    }
    /* ---------- get profile ---------- */
    async getUserProfile(id) {
        if (Number.isNaN(id))
            throw new Error('ValidationError: Invalid userId parameter');
        const user = await this.UserModel.findOne({
            where: { id },
            attributes: ['id', 'firstName', 'lastName', 'email', 'phone', 'photoUrl'],
        });
        if (!user)
            throw new Error('NotFoundError: User not found');
        return user;
    }
    /* ---------- edit profile ---------- */
    async editUserProfile(userId, data) {
        const user = await this.UserModel.findByPk(userId);
        if (!user)
            throw new Error('NotFoundError: User not found');
        const { firstName, lastName, phone, photoFileName } = data;
        /* перевірка унікальності телефону */
        if (phone) {
            const exists = await this.UserModel.findOne({
                where: { phone, id: { [sequelize_1.Op.ne]: userId } },
            });
            if (exists)
                throw new Error('ConflictError: Phone already in use by another user');
        }
        const photoUrl = photoFileName ? `images/${photoFileName}` : undefined;
        await user.update({
            firstName: firstName ?? user.firstName,
            lastName: lastName ?? user.lastName,
            phone: phone ?? user.phone,
            photoUrl: photoUrl ?? user.photoUrl,
        });
        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            photoUrl: user.photoUrl,
        };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('Bcrypt')),
    __param(1, (0, tsyringe_1.inject)('Jwt')),
    __param(2, (0, tsyringe_1.inject)('JwtSecret')),
    __param(3, (0, tsyringe_1.inject)('UserModel')),
    __metadata("design:paramtypes", [Object, Object, String, Object])
], UserService);
//# sourceMappingURL=userService.js.map
//# debugId=b8ee48a5-f381-5366-8482-ec1604b10829
