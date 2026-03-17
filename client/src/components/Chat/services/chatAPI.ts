import { Message, SendMessagePayload, UpdateMessagePayload } from '../types/chat';

class ChatAPI {
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
  }

  async getMessages(): Promise<Message[]> {
    const response = await fetch(`${this.baseURL}/messages`);
    if (!response.ok) throw new Error('Failed to fetch messages');
    return response.json();
  }

  async sendMessage(
    message: SendMessagePayload,
    files?: File[],
    onProgress?: (progress: number) => void
  ): Promise<Message> {
    const formData = new FormData();
    formData.append('message', JSON.stringify(message));

    if (files) {
      files.forEach((file) => {
        formData.append('files', file);
      });
    }

    const response = await fetch(`${this.baseURL}/messages`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) throw new Error('Failed to send message');
    return response.json();
  }

  async updateMessage({ id, text }: UpdateMessagePayload): Promise<Message> {
    const response = await fetch(`${this.baseURL}/messages/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) throw new Error('Failed to update message');
    return response.json();
  }

  async deleteMessage(id: number): Promise<void> {
    const response = await fetch(`${this.baseURL}/messages/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) throw new Error('Failed to delete message');
  }

  async downloadFile(fileId: string, fileName: string): Promise<void> {
    const response = await fetch(`${this.baseURL}/files/${fileId}`);

    if (!response.ok) throw new Error('Failed to download file');

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }
}

export const chatAPI = new ChatAPI();
