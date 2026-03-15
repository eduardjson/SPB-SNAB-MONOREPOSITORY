import { Product } from './product.entity';
import { Warehouse } from './warehouse.entity';

export interface StockItem {
  id: string;
  productId: string;
  warehouseId: string;
  quantity: number;
  purchasePrice: number | null;
  estimatePrice: number | null;
  salePrice: number | null;
  discount: number | null;
  createdAt: Date;
  updatedAt: Date;
  product?: Product;
  warehouse?: Warehouse;
}
