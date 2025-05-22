"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="921a7b53-f124-582d-b0b2-165b0daa2f05")}catch(e){}}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
class CategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService;
        this.createCategory = async (req, res, next) => {
            try {
                const { name } = req.body;
                const newCategory = await this.categoryService.createCategory(name);
                res.status(201).json(newCategory);
            }
            catch (error) {
                next(error);
            }
        };
        this.getAllCategories = async (req, res, next) => {
            try {
                const categories = await this.categoryService.getAllCategories();
                res.json(categories);
            }
            catch (error) {
                next(error);
            }
        };
        this.updateCategory = async (req, res, next) => {
            try {
                const id = +req.params.id;
                const { name } = req.body;
                const updated = await this.categoryService.updateCategory(id, name);
                res.json(updated);
            }
            catch (error) {
                next(error);
            }
        };
        this.deleteCategory = async (req, res, next) => {
            try {
                const id = +req.params.id;
                await this.categoryService.deleteCategory(id);
                res.status(204).send();
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.CategoryController = CategoryController;
//# sourceMappingURL=categoryController.js.map
//# debugId=921a7b53-f124-582d-b0b2-165b0daa2f05
