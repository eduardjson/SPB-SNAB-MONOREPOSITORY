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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectService = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("../../prisma");
let ProjectService = class ProjectService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto, files) {
        return this.prisma.$transaction(async (prisma) => {
            const project = await prisma.project.create({
                data: {
                    name: dto.name,
                    description: dto.description,
                },
            });
            if (files?.images?.length) {
                await Promise.all(files.images.map((file, index) => prisma.projectImage.create({
                    data: {
                        projectId: project.id,
                        data: new Uint8Array(file.buffer),
                        filename: file.originalname,
                        mimeType: file.mimetype,
                        size: file.size,
                        sortOrder: index,
                    },
                })));
            }
            if (files?.documents?.length) {
                await Promise.all(files.documents.map((file) => prisma.projectDocument.create({
                    data: {
                        projectId: project.id,
                        data: new Uint8Array(file.buffer),
                        filename: file.originalname,
                        mimeType: file.mimetype,
                        size: file.size,
                    },
                })));
            }
            if (dto.estimate) {
                const estimateData = typeof dto.estimate === 'string'
                    ? JSON.parse(dto.estimate)
                    : dto.estimate;
                await this.createEstimate(prisma, project.id, estimateData);
            }
            return project;
        });
    }
    async findAll() {
        return this.prisma.project.findMany({
            include: {
                images: {
                    select: { id: true, filename: true, mimeType: true, size: true },
                    take: 1,
                },
                _count: {
                    select: {
                        images: true,
                        documents: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        const project = await this.prisma.project.findUnique({
            where: { id },
            include: {
                images: {
                    select: {
                        id: true,
                        filename: true,
                        mimeType: true,
                        size: true,
                        sortOrder: true,
                    },
                    orderBy: { sortOrder: 'asc' },
                },
                documents: {
                    select: {
                        id: true,
                        filename: true,
                        mimeType: true,
                        size: true,
                        createdAt: true,
                    },
                },
                estimate: {
                    include: {
                        items: true,
                    },
                },
            },
        });
        if (!project) {
            throw new common_1.NotFoundException('Проект не найден');
        }
        return project;
    }
    async update(id, dto, files) {
        return this.prisma.$transaction(async (prisma) => {
            const project = await prisma.project.findUnique({ where: { id } });
            if (!project) {
                throw new common_1.NotFoundException('Проект не найден');
            }
            const updatedProject = await prisma.project.update({
                where: { id },
                data: {
                    name: dto.name,
                    description: dto.description,
                },
            });
            if (files?.images?.length) {
                const currentImagesCount = await prisma.projectImage.count({
                    where: { projectId: id },
                });
                await Promise.all(files.images.map((file, index) => prisma.projectImage.create({
                    data: {
                        projectId: id,
                        data: new Uint8Array(file.buffer),
                        filename: file.originalname,
                        mimeType: file.mimetype,
                        size: file.size,
                        sortOrder: currentImagesCount + index,
                    },
                })));
            }
            if (files?.documents?.length) {
                await Promise.all(files.documents.map((file) => prisma.projectDocument.create({
                    data: {
                        projectId: id,
                        data: new Uint8Array(file.buffer),
                        filename: file.originalname,
                        mimeType: file.mimetype,
                        size: file.size,
                    },
                })));
            }
            if (dto.estimate) {
                const estimateData = typeof dto.estimate === 'string'
                    ? JSON.parse(dto.estimate)
                    : dto.estimate;
                await prisma.estimate.deleteMany({ where: { projectId: id } });
                await this.createEstimate(prisma, id, estimateData);
            }
            return updatedProject;
        });
    }
    async delete(id) {
        return this.prisma.project.delete({ where: { id } });
    }
    async getImage(id) {
        const image = await this.prisma.projectImage.findUnique({
            where: { id },
        });
        if (!image) {
            throw new common_1.NotFoundException('Изображение не найдено');
        }
        return image;
    }
    async getDocument(id) {
        const document = await this.prisma.projectDocument.findUnique({
            where: { id },
        });
        if (!document) {
            throw new common_1.NotFoundException('Документ не найден');
        }
        return document;
    }
    async deleteImage(id) {
        return this.prisma.projectImage.delete({ where: { id } });
    }
    async deleteDocument(id) {
        return this.prisma.projectDocument.delete({ where: { id } });
    }
    async createEstimate(prisma, projectId, estimateDto) {
        const items = estimateDto.items || [];
        const estimate = await prisma.estimate.create({
            data: {
                projectId,
                laborCost: estimateDto.laborCost || 0,
            },
        });
        let totalCost = 0;
        let materialsCost = 0;
        if (items.length > 0) {
            const estimateItems = await Promise.all(items.map(async (item) => {
                const total = item.quantity * item.price;
                totalCost += total;
                if (item.costType !== 'LABOR') {
                    materialsCost += total;
                }
                return prisma.estimateItem.create({
                    data: {
                        estimateId: estimate.id,
                        productId: item.productId,
                        name: item.name,
                        description: item.description,
                        quantity: item.quantity,
                        unit: item.unit || 'шт',
                        price: item.price,
                        total: total,
                        costType: item.costType || 'MATERIAL',
                    },
                });
            }));
        }
        return prisma.estimate.update({
            where: { id: estimate.id },
            data: {
                totalCost,
                materialsCost,
            },
            include: {
                items: true,
            },
        });
    }
};
exports.ProjectService = ProjectService;
exports.ProjectService = ProjectService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_1.PrismaService])
], ProjectService);
//# sourceMappingURL=project.service.js.map