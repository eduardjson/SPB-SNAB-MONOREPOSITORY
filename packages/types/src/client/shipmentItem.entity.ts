import { Shipment } from './shipment.entity';
import { Product } from './product.entity';

export interface ShipmentItem {
  id: string;
  shipmentId: string;
  productId: string;
  quantity: number;
  createdAt: Date;
  shipment?: Shipment;
  product?: Product;
}
