import { CostType } from './cost-type.enum';
export declare class EstimateItemDto {
    productId?: string;
    name: string;
    description?: string;
    quantity: number;
    unit?: string;
    price: number;
    costType?: CostType;
}
