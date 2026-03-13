import { PrismaService } from 'src/prisma';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { ShipmentStatus } from 'generated/prisma/client';
export declare class ShipmentService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateShipmentDto): Promise<object>;
    readOne(id: string): Promise<object>;
    readMany(): Promise<object[]>;
    updateStatus(id: string, status: ShipmentStatus): Promise<object>;
    delete(id: string): Promise<void>;
    getShipmentsByObject(objectId: string): Promise<object[]>;
    getShipmentsByWarehouse(warehouseId: string): Promise<object[]>;
}
