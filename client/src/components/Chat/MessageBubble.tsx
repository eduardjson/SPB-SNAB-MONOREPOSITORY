import { Box, Button } from '@mui/material';
import React from 'react';
import { FiEdit2, FiTrash } from 'react-icons/fi';
import TimeAgo from 'react-timeago';
import { Message } from '../../types';

import { FileAttachment } from './FileAttachment';

interface MessageBubbleProps {
  message: Message;
  isOwnMessage: boolean;
  isEditing: boolean;
  onEdit: () => void;
  onDelete: () => void;
  disabled?: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isOwnMessage,
  isEditing,
  onEdit,
  onDelete,
  disabled,
}) => {
  return (
    <div
      className={[
        'my-2 p-4 rounded-lg text-gray-800 w-[75%]',
        isOwnMessage
          ? 'self-end border border-green-500 bg-green-300'
          : 'self-start border border-blue-500 bg-blue-300',
        isEditing ? 'opacity-50' : '',
      ].join(' ')}
      style={{
        marginLeft: isOwnMessage ? 'auto' : undefined,
        marginRight: isOwnMessage ? undefined : 'auto',
      }}
    >
      <div className="flex justify-between text-sm mb-1">
        <span>
          {isOwnMessage ? 'Вы: ' : ''}
          {message.userName}
        </span>
        <TimeAgo date={message.createdAt} />
      </div>

      {message.text && message.text !== '(Файл)' && <p>{message.text}</p>}

      {message.attachments && message.attachments.length > 0 && (
        <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap' }}>
          {message.attachments.map((att) => (
            <FileAttachment key={att.id} attachment={att} />
          ))}
        </Box>
      )}

      {isOwnMessage && (
        <div className="flex justify-end mt-2">
          <Button
            size="small"
            disabled={disabled}
            onClick={onEdit}
            sx={{ minWidth: 'auto', p: 0.5, mr: 0.5 }}
          >
            <FiEdit2 size="18" color={disabled ? '#ccc' : '#22c55e'} />
          </Button>
          <Button
            size="small"
            disabled={disabled}
            onClick={onDelete}
            sx={{ minWidth: 'auto', p: 0.5 }}
          >
            <FiTrash size="18" color={disabled ? '#ccc' : '#22c55e'} />
          </Button>
        </div>
      )}
    </div>
  );
};
