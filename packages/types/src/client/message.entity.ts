import { Attachment } from './attachment.entity';

export interface Message {
  id: number;
  userId: string;
  userName: string;
  text: string;
  createdAt: Date;
  attachments?: Attachment[];
}
