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
exports.ObjectService = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("../../prisma");
let ObjectService = class ObjectService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const object = await this.prisma.object.create({ data: dto });
        return object.id;
    }
    async readOne(id) {
        const object = await this.prisma.object.findUnique({
            where: { id },
            include: {
                shipments: {
                    include: {
                        items: {
                            include: {
                                product: true,
                            },
                        },
                        warehouse: true,
                    },
                },
            },
        });
        if (!object) {
            throw new common_1.NotFoundException("Объект не найден");
        }
        return object;
    }
    async readMany() {
        return await this.prisma.object.findMany({
            include: {
                shipments: {
                    include: {
                        items: {
                            include: {
                                product: true,
                            },
                        },
                    },
                },
            },
        });
    }
    async update(id, dto) {
        await this.readOne(id);
        return await this.prisma.object.update({
            where: { id },
            data: dto,
        });
    }
    async delete(id) {
        await this.readOne(id);
        await this.prisma.object.delete({ where: { id } });
    }
};
exports.ObjectService = ObjectService;
exports.ObjectService = ObjectService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_1.PrismaService])
], ObjectService);
//# sourceMappingURL=object.service.js.map