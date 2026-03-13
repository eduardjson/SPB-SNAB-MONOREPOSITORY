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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const express_1 = __importDefault(require("express"));
const project_service_1 = require("./project.service");
const update_project_dto_1 = require("./dto/update-project.dto");
let ProjectController = class ProjectController {
    projectService;
    constructor(projectService) {
        this.projectService = projectService;
    }
    async create(dto, files) {
        if (dto.estimate && typeof dto.estimate === 'string') {
            try {
                dto.estimate = JSON.parse(dto.estimate);
            }
            catch (e) {
                throw new common_1.BadRequestException('Invalid estimate format');
            }
        }
        const createDto = {
            name: dto.name,
            description: dto.description,
            estimate: dto.estimate,
        };
        return this.projectService.create(createDto, files);
    }
    async findAll() {
        return this.projectService.findAll();
    }
    async findOne(id) {
        return this.projectService.findOne(id);
    }
    async update(id, dto, files) {
        return this.projectService.update(id, dto, files);
    }
    async delete(id) {
        await this.projectService.delete(id);
        return { message: 'Проект успешно удален' };
    }
    async getImage(id, res) {
        const image = await this.projectService.getImage(id);
        res.setHeader('Content-Type', image.mimeType);
        res.setHeader('Content-Disposition', `inline; filename="${image.filename}"`);
        res.send(image.data);
    }
    async getImageBlob(id) {
        const image = await this.projectService.getImage(id);
        return new common_1.StreamableFile(image.data, {
            type: image.mimeType,
            disposition: `inline; filename="${encodeURIComponent(image.filename)}"`,
            length: image.size,
        });
    }
    async getDocument(id, res) {
        const document = await this.projectService.getDocument(id);
        res.setHeader('Content-Type', document.mimeType);
        res.setHeader('Content-Disposition', `attachment; filename="${document.filename}"`);
        res.send(document.data);
    }
    async getDocumentBlob(id) {
        const document = await this.projectService.getDocument(id);
        return new common_1.StreamableFile(document.data, {
            type: document.mimeType,
            disposition: `attachment; filename="${encodeURIComponent(document.filename)}"`,
            length: document.size,
        });
    }
    async deleteImage(id) {
        await this.projectService.deleteImage(id);
        return { message: 'Изображение удалено' };
    }
    async deleteDocument(id) {
        await this.projectService.deleteDocument(id);
        return { message: 'Документ удален' };
    }
};
exports.ProjectController = ProjectController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'images', maxCount: 20 },
        { name: 'documents', maxCount: 10 },
    ])),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'images', maxCount: 20 },
        { name: 'documents', maxCount: 10 },
    ])),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_project_dto_1.UpdateProjectDto, Object]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)('images/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "getImage", null);
__decorate([
    (0, common_1.Get)('images/:id/blob'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "getImageBlob", null);
__decorate([
    (0, common_1.Get)('documents/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "getDocument", null);
__decorate([
    (0, common_1.Get)('documents/:id/blob'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "getDocumentBlob", null);
__decorate([
    (0, common_1.Delete)('images/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "deleteImage", null);
__decorate([
    (0, common_1.Delete)('documents/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "deleteDocument", null);
exports.ProjectController = ProjectController = __decorate([
    (0, common_1.Controller)('projects'),
    __metadata("design:paramtypes", [project_service_1.ProjectService])
], ProjectController);
//# sourceMappingURL=project.controller.js.map