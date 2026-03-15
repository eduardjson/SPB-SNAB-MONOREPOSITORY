import { ProjectStatus } from '@prisma/client';
import { ProjectImage } from './projectImage.entity';
import { ProjectDocument } from './projectDocument.entity';
import { Estimate } from './estimate.entity';

export interface Project {
  id: string;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  images?: ProjectImage[];
  documents?: ProjectDocument[];
  estimate?: Estimate | null;
  status: ProjectStatus;
}
