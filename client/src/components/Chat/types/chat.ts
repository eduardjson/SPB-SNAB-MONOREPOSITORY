export interface Message {
  id: number;
  userId: string;
  userName: string;
  text: string;
  createdAt: string;
  attachments?: Attachment[];
}

export interface Attachment {
  id: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  url?: string;
}

export interface SendMessagePayload {
  userId: string;
  userName: string;
  text: string;
}

export interface UpdateMessagePayload {
  id: number;
  text: string;
}

export interface ChatState {
  messages: Message[];
  log: string | null;
  isLoading: boolean;
  error: string | null;
  uploadProgress: number | null;
}
