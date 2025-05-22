"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="af6c134f-9783-5941-bf53-2e4db156ebb0")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// Налаштування зберігання файлів за допомогою multer
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/'); // Зберігаємо файли в папці images
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path_1.default.extname(file.originalname)); // Генеруємо унікальне ім'я для файлу
    }
});
const upload = (0, multer_1.default)({ storage });
// Middleware для обробки одного файлу (з полем 'image')
exports.uploadImage = upload.single('image');
//# sourceMappingURL=upload.js.map
//# debugId=af6c134f-9783-5941-bf53-2e4db156ebb0
