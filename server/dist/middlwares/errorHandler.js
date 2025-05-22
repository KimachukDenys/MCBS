"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="115be52b-9ac9-5e1f-9f7e-b3432b64c8c8")}catch(e){}}();

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const Sentry = __importStar(require("@sentry/node"));
const errorHandler = (err, _req, res, _next) => {
    console.error(err.stack);
    Sentry.captureException(err);
    if (err.message.startsWith('ValidationError')) {
        res.status(400).json({ message: err.message.replace('ValidationError: ', '') });
        return;
    }
    if (err.message.startsWith('ConflictError')) {
        res.status(409).json({ message: err.message.replace('ConflictError: ', '') });
        return;
    }
    if (err.message.startsWith('NotFoundError')) {
        res.status(404).json({ message: err.message.replace('NotFoundError: ', '') });
        return;
    }
    if (err.message.startsWith('AuthError')) {
        res.status(400).json({ message: err.message.replace('AuthError: ', '') });
        return;
    }
    res.status(err.status || 500).json({ message: err.message || 'Server error' });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map
//# debugId=115be52b-9ac9-5e1f-9f7e-b3432b64c8c8
