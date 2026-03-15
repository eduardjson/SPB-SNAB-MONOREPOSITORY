import { StockItem } from './stockItem.entity';
import { Shipment } from './shipment.entity';

export interface Warehouse {
  id: string;
  name: string;
  address: string | null;
  createdAt: Date;
  updatedAt: Date;
  stockItems?: StockItem[];
  shipments?: Shipment[];
}
