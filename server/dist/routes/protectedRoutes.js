"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlwares/auth");
const router = express_1.default.Router();
router.get('/profile', auth_1.authenticateToken, (req, res) => {
    res.json({ message: 'This is protected data!', user: req.user });
});
exports.default = router;
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="4a447def-ef87-588a-8afb-ea72147bcab1")}catch(e){}}();
//# debugId=4a447def-ef87-588a-8afb-ea72147bcab1
