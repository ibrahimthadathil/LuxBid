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
exports.productService = void 0;
const typedi_1 = require("typedi");
const productsRepository_1 = require("../../../repositories/implimentation/product/productsRepository");
const uploadService_1 = require("../user/uploadService");
const category_Service_1 = require("../admin/category_Service");
const logger_utils_1 = require("@/utils/logger_utils");
let productService = class productService {
    constructor(productrepo, s3Service, categoryService) {
        this.productrepo = productrepo;
        this.s3Service = s3Service;
        this.categoryService = categoryService;
    }
    create_Post(user, datas, files) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = yield this.categoryService.find_Category(datas.category);
                if (data) {
                    console.log('kkkk');
                    const response = yield this.s3Service.upload_File(files, 'product');
                    console.log('wwwwwwww');
                    if (Array.isArray(response)) {
                        console.log('dddddddd');
                        const imagesLink = response.map((file) => file.Location);
                        datas.category = data._id;
                        const post = Object.assign(Object.assign({}, datas), { images: imagesLink, seller: user });
                        const setPost = yield this.productrepo.create(post);
                        console.log('$$$$$$$$$', setPost);
                        if (setPost)
                            return { success: true, message: 'Post created Successfully' };
                        else
                            return { success: false, message: 'Failed to create' };
                    }
                    else
                        throw new Error('Server Error , Try later');
                }
                else
                    throw new Error('failed for setup');
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                console.log('from create post error');
                return { success: false, message: error.message };
            }
        });
    }
    findUser_Post(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield this.productrepo.findByUser(userId);
                if (res) {
                    return { success: true, data: res };
                }
                else
                    throw new Error('Failed to fetch');
            }
            catch (error) {
                return { success: false, message: error.message };
            }
        });
    }
    findAll_Products(status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.productrepo.findByStatus(status);
                if (response)
                    return { success: true, data: response };
                else
                    throw new Error('Failed to fetch');
            }
            catch (error) {
                return { success: false, message: error.message };
            }
        });
    }
    remove_Post(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const post = yield this.productrepo.findById(id);
                const imagesLink = (post === null || post === void 0 ? void 0 : post.images) || [];
                const response = yield this.s3Service.delete_File(imagesLink);
                if (response) {
                    const response = yield this.productrepo.delete(id);
                    if (response)
                        return { success: true, message: 'Delete successfully' };
                    else
                        throw new Error('failed to delete from the DB');
                }
                else
                    throw new Error('failed to delete');
            }
            catch (error) {
                return { success: false, message: error.message };
            }
        });
    }
    update_PostStatus(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.productrepo.update(id, { status: 'Approved', isApproved: true });
                if (response)
                    return { success: true, message: 'Post Approved' };
                else
                    throw new Error('Failed to Approve');
            }
            catch (error) {
                return { success: false, message: error.message };
            }
        });
    }
    reject_Post(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.productrepo.update(id, { status: 'Rejected', isApproved: false });
                if (response) {
                    return { success: true, message: 'Post Rejected' };
                }
                else
                    throw new Error('Failed to Reject');
            }
            catch (error) {
                return { success: false, message: error.message };
            }
        });
    }
    update_post(id, data, img) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const findCategory = yield this.categoryService.find_Category(data.category);
                const existingImg = data.preImg ? data.preImg.split(',') : [];
                if (img === null || img === void 0 ? void 0 : img.length) {
                    const response = yield this.s3Service.upload_File(img, 'product');
                    if (Array.isArray(response))
                        response.map((link) => existingImg.push(link.Location));
                    else
                        throw new Error('Failed to upload Image, Try later');
                }
                const updatedPost = { title: data.title, category: findCategory.data._id, images: existingImg, description: data.description };
                const response = yield this.productrepo.update(id, updatedPost);
                if (response)
                    return { success: true, message: 'Post updated' };
                else
                    throw new Error('failed to update');
            }
            catch (error) {
                console.log('0000', error.message);
                return { success: false, message: error.message };
            }
        });
    }
    approved_Post(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const approvedPost = yield this.productrepo.findByApproved(userId);
                console.log('approved', approvedPost);
                if (approvedPost)
                    return { success: true, data: approvedPost };
                else
                    throw new Error('Failed to fetch post');
            }
            catch (error) {
                console.log('approved post', error.message);
                return { success: false, message: error.message };
            }
        });
    }
};
exports.productService = productService;
exports.productService = productService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [productsRepository_1.productRepository,
        uploadService_1.s3Service,
        category_Service_1.categoryService])
], productService);
