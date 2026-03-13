declare class ShipmentItemDto {
    productId: string;
    quantity: number;
}
export declare class CreateShipmentDto {
    warehouseId: string;
    objectId: string;
    items: ShipmentItemDto[];
}
export {};
