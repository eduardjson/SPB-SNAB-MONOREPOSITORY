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
exports.ShipmentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("../../prisma");
let ShipmentService = class ShipmentService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const { warehouseId, objectId, items } = dto;
        await this.prisma.warehouse
            .findUniqueOrThrow({ where: { id: warehouseId } })
            .catch(() => {
            throw new common_1.NotFoundException('Склад не найден');
        });
        await this.prisma.object
            .findUniqueOrThrow({ where: { id: objectId } })
            .catch(() => {
            throw new common_1.NotFoundException('Объект не найден');
        });
        for (const item of items) {
            const stockItem = await this.prisma.stockItem.findUnique({
                where: {
                    productId_warehouseId: {
                        productId: item.productId,
                        warehouseId,
                    },
                },
            });
            if (!stockItem || stockItem.quantity < item.quantity) {
                const product = await this.prisma.product.findUnique({
                    where: { id: item.productId },
                });
                throw new common_1.BadRequestException(`Недостаточно товара "${product?.title || item.productId}" на складе. Доступно: ${stockItem?.quantity || 0}`);
            }
        }
        return await this.prisma.$transaction(async (prisma) => {
            const shipment = await prisma.shipment.create({
                data: {
                    warehouseId,
                    objectId,
                    items: {
                        create: items.map((item) => ({
                            productId: item.productId,
                            quantity: item.quantity,
                        })),
                    },
                },
                include: {
                    items: {
                        include: {
                            product: true,
                        },
                    },
                    warehouse: true,
                    object: true,
                },
            });
            for (const item of items) {
                await prisma.stockItem.update({
                    where: {
                        productId_warehouseId: {
                            productId: item.productId,
                            warehouseId,
                        },
                    },
                    data: {
                        quantity: {
                            decrement: item.quantity,
                        },
                    },
                });
            }
            return shipment;
        });
    }
    async readOne(id) {
        const shipment = await this.prisma.shipment.findUnique({
            where: { id },
            include: {
                warehouse: true,
                object: true,
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });
        if (!shipment) {
            throw new common_1.NotFoundException('Отгрузка не найдена');
        }
        return shipment;
    }
    async readMany() {
        return await this.prisma.shipment.findMany({
            include: {
                warehouse: true,
                object: true,
                items: {
                    include: {
                        product: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
    async updateStatus(id, status) {
        await this.readOne(id);
        return await this.prisma.shipment.update({
            where: { id },
            data: { status },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });
    }
    async delete(id) {
        const shipment = await this.prisma.shipment.findUnique({
            where: { id },
            include: { items: true },
        });
        if (!shipment) {
            throw new common_1.NotFoundException('Отгрузка не найдена');
        }
        if (shipment.status === 'COMPLETED') {
            await this.prisma.$transaction(async (prisma) => {
                for (const item of shipment.items) {
                    await prisma.stockItem.update({
                        where: {
                            productId_warehouseId: {
                                productId: item.productId,
                                warehouseId: shipment.warehouseId,
                            },
                        },
                        data: {
                            quantity: {
                                increment: item.quantity,
                            },
                        },
                    });
                }
                await prisma.shipment.delete({ where: { id } });
            });
        }
        else {
            await this.prisma.shipment.delete({ where: { id } });
        }
    }
    async getShipmentsByObject(objectId) {
        return await this.prisma.shipment.findMany({
            where: { objectId },
            include: {
                warehouse: true,
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });
    }
    async getShipmentsByWarehouse(warehouseId) {
        return await this.prisma.shipment.findMany({
            where: { warehouseId },
            include: {
                object: true,
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });
    }
};
exports.ShipmentService = ShipmentService;
exports.ShipmentService = ShipmentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_1.PrismaService])
], ShipmentService);
//# sourceMappingURL=shipment.service.js.map