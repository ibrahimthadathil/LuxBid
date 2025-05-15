"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryService = void 0;
const typedi_1 = require("typedi");
const category_Repository_1 = require("../../../repositories/implimentation/admin/category_Repository");
const messageRepositury_1 = require("@/repositories/implimentation/chat/messageRepositury");
const logger_utils_1 = require("@/utils/logger_utils");
let categoryService = class categoryService {
    constructor(cateRepo, chatRepo) {
        this.cateRepo = cateRepo;
        this.chatRepo = chatRepo;
    }
    add_Category(name, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const exist = yield this.cateRepo.findByName(name);
                if (exist)
                    return { success: false, message: 'Already exist' };
                const response = yield this.cateRepo.create({ name, isActive: status });
                if (response)
                    yield this.chatRepo.create({ category: response.id, isAdmin: true, content: `Welcome to the ${name} group chat! Feel free to share your thoughts.` });
                else
                    throw new Error('Group chat Execution failed');
                if (response)
                    return { success: true, message: 'Created succesfully' };
                else
                    throw new Error('Failed to Add category');
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                throw new Error(error.message);
            }
        });
    }
    get_Category() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.cateRepo.findAll();
                if (response)
                    return { success: true, data: response };
                else
                    throw new Error('failed to fetch');
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                return { success: false, message: error.message };
            }
        });
    }
    get_ListedCategory() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.cateRepo.findByListed();
                if (response)
                    return { success: true, data: response };
                else
                    throw new Error('failed to fetch');
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                return { success: false, message: error.message };
            }
        });
    }
    find_Category(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.cateRepo.findByName(name);
                if (response)
                    return { success: true, data: response };
                else
                    throw new Error('failed to fetch category');
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                throw new Error('error from finding category');
            }
        });
    }
    remove_Category(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.cateRepo.delete(id);
                if (response)
                    return { success: true, message: 'Deleted succesfully' };
                else
                    throw new Error('failed to delete');
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                throw new Error('Error from category Deletion');
            }
        });
    }
    category_Update(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.cateRepo.listAndUnlist(id);
                if (response)
                    return { success: true, message: response.isActive ? 'Item Blocked' : 'Item listed' };
                else
                    return { success: false, message: 'failed to update' };
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                return { success: false, message: 'Internal Error, Try Later' };
            }
        });
    }
};
exports.categoryService = categoryService;
exports.categoryService = categoryService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [category_Repository_1.categoryRepository,
        messageRepositury_1.messageRepository])
], categoryService);
