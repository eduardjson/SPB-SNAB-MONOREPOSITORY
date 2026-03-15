import { Message } from './message.entity';

export interface Attachment {
  id: string;
  messageId: number;
  message?: Message;
  fileName: string;
  fileSize: number;
  fileType: string;
  filePath: string;
  uploadedAt: Date;
}
