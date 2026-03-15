import { Project } from './project.entity';
import { EstimateItem } from './estimateItem.entity';

export interface Estimate {
  id: string;
  projectId: string;
  project?: Project;
  items?: EstimateItem[];
  totalCost: number;
  laborCost: number | null;
  materialsCost: number | null;
  createdAt: Date;
  updatedAt: Date;
}
