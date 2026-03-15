import { Shipment } from './shipment.entity';

export interface Object {
  id: string;
  name: string;
  address: string | null;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  shipments?: Shipment[];
}
