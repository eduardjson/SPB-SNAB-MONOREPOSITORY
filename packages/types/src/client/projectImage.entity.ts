import { Project } from './project.entity';

export interface ProjectImage {
  id: string;
  projectId: string;
  project?: Project;
  data: Buffer;
  filename: string;
  mimeType: string;
  size: number;
  createdAt: Date;
  sortOrder: number;
}
