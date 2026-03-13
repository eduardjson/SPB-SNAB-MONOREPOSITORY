import { ShipmentService } from "./shipment.service";
import { CreateShipmentDto } from "./dto/create-shipment.dto";
import { UpdateStatusDto } from "./dto/update-status.dto";
export declare class ShipmentController {
    private readonly service;
    constructor(service: ShipmentService);
    readMany(): Promise<object[]>;
    readOne(id: string): Promise<object>;
    create(dto: CreateShipmentDto): Promise<object>;
    updateStatus(id: string, dto: UpdateStatusDto): Promise<object>;
    delete(id: string): Promise<void>;
    getByObject(objectId: string): Promise<object[]>;
    getByWarehouse(warehouseId: string): Promise<object[]>;
}
