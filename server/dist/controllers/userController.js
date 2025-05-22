"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="9241145a-6495-5dcd-8983-128de4ac57d3")}catch(e){}}();

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
exports.UserController = void 0;
const tsyringe_1 = require("tsyringe");
const userService_1 = require("../services/userService");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
        this.registerUser = (req, res, next) => this.userService.registerUser(req.body)
            .then(result => res.status(201).json(result))
            .catch(next);
        this.loginUser = (req, res, next) => this.userService.loginUser(req.body.email, req.body.password)
            .then(result => res.status(200).json(result))
            .catch(next);
        this.getUserProfile = (req, res, next) => this.userService.getUserProfile(Number(req.params.id))
            .then(user => res.status(200).json(user))
            .catch(next);
        this.editUserProfile = (req, res, next) => {
            const userId = Number(req.params.id);
            const data = { ...req.body, photoFileName: req.file?.filename };
            this.userService.editUserProfile(userId, data)
                .then(u => res.status(200).json(u))
                .catch(next);
        };
    }
};
exports.UserController = UserController;
exports.UserController = UserController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(userService_1.UserService)),
    __metadata("design:paramtypes", [userService_1.UserService])
], UserController);
//# sourceMappingURL=userController.js.map
//# debugId=9241145a-6495-5dcd-8983-128de4ac57d3
