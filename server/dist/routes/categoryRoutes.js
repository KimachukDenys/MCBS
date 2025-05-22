"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="ecaa16d7-2ee2-50e4-b78f-e3380da5b255")}catch(e){}}();

Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoryService_1 = require("../services/categoryService");
const categoryController_1 = require("../controllers/categoryController");
const auth_1 = require("../middlwares/auth");
const router = (0, express_1.Router)();
const controller = new categoryController_1.CategoryController(new categoryService_1.CategoryService());
router.post('/create', auth_1.authenticateToken, (0, auth_1.authorizeRole)(['admin']), controller.createCategory);
router.get('/', controller.getAllCategories);
router.put('/:id', auth_1.authenticateToken, (0, auth_1.authorizeRole)(['admin']), controller.updateCategory);
router.delete('/:id', auth_1.authenticateToken, (0, auth_1.authorizeRole)(['admin']), controller.deleteCategory);
exports.default = router;
//# sourceMappingURL=categoryRoutes.js.map
//# debugId=ecaa16d7-2ee2-50e4-b78f-e3380da5b255
