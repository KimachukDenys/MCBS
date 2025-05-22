"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="83dda558-3930-54df-8652-60d289148af9")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const Categories_1 = __importDefault(require("../models/Categories"));
class CategoryService {
    async createCategory(name) {
        return await Categories_1.default.create({ name });
    }
    async getAllCategories() {
        return await Categories_1.default.findAll();
    }
    async updateCategory(id, name) {
        const category = await Categories_1.default.findByPk(id);
        if (!category) {
            throw new Error('NotFound:Category not found');
        }
        category.name = name;
        return await category.save();
    }
    async deleteCategory(id) {
        const category = await Categories_1.default.findByPk(id);
        if (!category) {
            throw new Error('NotFound:Category not found');
        }
        await category.destroy();
    }
}
exports.CategoryService = CategoryService;
//# sourceMappingURL=categoryService.js.map
//# debugId=83dda558-3930-54df-8652-60d289148af9
