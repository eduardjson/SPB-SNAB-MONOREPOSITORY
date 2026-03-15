import { DocumentType } from '@prisma/client';
import { Project } from './project.entity';

export interface ProjectDocument {
  id: string;
  projectId: string;
  project?: Project;
  data: Buffer;
  filename: string;
  mimeType: string;
  size: number;
  createdAt: Date;
  docType: DocumentType;
}
