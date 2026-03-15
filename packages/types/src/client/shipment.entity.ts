import { ShipmentStatus } from '@prisma/client';
import { Warehouse } from './warehouse.entity';
import { Object } from './object.entity';
import { ShipmentItem } from './shipmentItem.entity';

export interface Shipment {
  id: string;
  warehouseId: string;
  objectId: string;
  status: ShipmentStatus;
  createdAt: Date;
  updatedAt: Date;
  warehouse?: Warehouse;
  object?: Object;
  items?: ShipmentItem[];
}
