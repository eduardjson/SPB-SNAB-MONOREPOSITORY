import { CostType } from '@prisma/client';
import { Estimate } from './estimate.entity';

export interface EstimateItem {
  id: string;
  estimateId: string;
  estimate?: Estimate;
  productId: string | null;
  name: string;
  description: string | null;
  quantity: number;
  unit: string;
  price: number;
  total: number;
  costType: CostType;
}
