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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShipmentController = void 0;
const common_1 = require("@nestjs/common");
const shipment_service_1 = require("./shipment.service");
const create_shipment_dto_1 = require("./dto/create-shipment.dto");
const update_status_dto_1 = require("./dto/update-status.dto");
let ShipmentController = class ShipmentController {
    service;
    constructor(service) {
        this.service = service;
    }
    async readMany() {
        return await this.service.readMany();
    }
    async readOne(id) {
        return await this.service.readOne(id);
    }
    async create(dto) {
        return await this.service.create(dto);
    }
    async updateStatus(id, dto) {
        return await this.service.updateStatus(id, dto.status);
    }
    async delete(id) {
        await this.service.delete(id);
    }
    async getByObject(objectId) {
        return await this.service.getShipmentsByObject(objectId);
    }
    async getByWarehouse(warehouseId) {
        return await this.service.getShipmentsByWarehouse(warehouseId);
    }
};
exports.ShipmentController = ShipmentController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ShipmentController.prototype, "readMany", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ShipmentController.prototype, "readOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_shipment_dto_1.CreateShipmentDto]),
    __metadata("design:returntype", Promise)
], ShipmentController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(":id/status"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_status_dto_1.UpdateStatusDto]),
    __metadata("design:returntype", Promise)
], ShipmentController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ShipmentController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)("by-object/:objectId"),
    __param(0, (0, common_1.Param)("objectId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ShipmentController.prototype, "getByObject", null);
__decorate([
    (0, common_1.Get)("by-warehouse/:warehouseId"),
    __param(0, (0, common_1.Param)("warehouseId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ShipmentController.prototype, "getByWarehouse", null);
exports.ShipmentController = ShipmentController = __decorate([
    (0, common_1.Controller)("shipments"),
    __metadata("design:paramtypes", [shipment_service_1.ShipmentService])
], ShipmentController);
//# sourceMappingURL=shipment.controller.js.map