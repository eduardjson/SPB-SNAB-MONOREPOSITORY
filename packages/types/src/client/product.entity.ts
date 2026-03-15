import { ProductImage } from './productImage.entity';
import { ShipmentItem } from './shipmentItem.entity';
import { StockItem } from './stockItem.entity';

export interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  manufacturer: string;
  imageUrl: string;
  unit: string;
  images?: ProductImage[];
  shipmentItems?: ShipmentItem[];
  stockItems?: StockItem[];
}
