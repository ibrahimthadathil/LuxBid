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
exports.s3Service = void 0;
const typedi_1 = require("typedi");
const client_s3_1 = require("@aws-sdk/client-s3");
const node_http_handler_1 = require("@aws-sdk/node-http-handler");
const logger_utils_1 = require("@/utils/logger_utils");
let s3Service = class s3Service {
    constructor() {
        this.s3Service = new client_s3_1.S3Client({
            credentials: {
                accessKeyId: process.env.BUCKET_ACCESS_KEY || "",
                secretAccessKey: process.env.BUCKET_SECRET_KEY || "",
            },
            region: process.env.BUCKET_REGION || "",
            requestHandler: new node_http_handler_1.NodeHttpHandler({
                connectionTimeout: 300000, // Set connection timeout (5 minutes)
                socketTimeout: 300000, // Set socket timeout (5 minutes)
            }),
        });
    }
    validate_Files(file) {
        if (file.size > 2 * 1024 * 1024)
            throw new Error("File size too large. Maximum size is 2MB");
        const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
        if (!allowedTypes.includes(file.mimetype))
            throw new Error("Only image files are allowed");
    }
    upload_File(file, folder) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const images = Array.isArray(file) ? file : [file];
                images.forEach((img) => this.validate_Files(img));
                const results = yield Promise.all(images.map((img) => __awaiter(this, void 0, void 0, function* () {
                    const randomString = `LBP${Math.floor(100 + Math.random() * 900)}`;
                    const extension = img.originalname.split(".").pop(); // Keep original file extension
                    const fileName = `${randomString}.${extension}`;
                    const params = {
                        Bucket: process.env.BUCKET_NAME,
                        Key: `${folder}/${Date.now()}-${fileName}`,
                        Body: img.buffer,
                        ContentType: img.mimetype,
                    };
                    const command = new client_s3_1.PutObjectCommand(params);
                    yield this.s3Service.send(command);
                    // const getObjectCommand = new GetObjectCommand({
                    //   Bucket: process.env.BUCKET_NAME,
                    //   Key: params.Key,
                    // });
                    // const presignedUrl = await getSignedUrl(
                    //   this.s3Service,
                    //   getObjectCommand,
                    //   { expiresIn: 604800 }
                    // );
                    return {
                        success: true,
                        Location: `https://${process.env.BUCKET_NAME}.s3.${process.env.BUCKET_REGION}.amazonaws.com/${params.Key}`,
                    };
                })));
                return Array.isArray(file) ? results : results[0];
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    delete_File(files) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                for (const url of files) {
                    const key = url.split(".com/")[1];
                    const params = {
                        Bucket: process.env.BUCKET_NAME,
                        Key: key,
                    };
                    const command = new client_s3_1.DeleteObjectCommand(params);
                    try {
                        yield this.s3Service.send(command);
                    }
                    catch (error) {
                        (0, logger_utils_1.logError)(error);
                        throw new Error("Faield to delete");
                    }
                }
                return true;
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                throw new Error("Error occured in delete file");
            }
        });
    }
};
exports.s3Service = s3Service;
exports.s3Service = s3Service = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], s3Service);
