import { Product } from './product.entity';

export interface ProductImage {
  id: string;
  productId: string;
  url: string;
  product?: Product;
}
