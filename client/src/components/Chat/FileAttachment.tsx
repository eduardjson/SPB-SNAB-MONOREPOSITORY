import { InsertDriveFile } from '@mui/icons-material';
import { Chip, CircularProgress, Tooltip } from '@mui/material';
import React, { useState } from 'react';

import { useChat } from '../../useChat';
import { formatFileSize, truncateFileName } from './utils/chatUtils';

interface FileAttachmentProps {
  attachment: any;
}

export const FileAttachment: React.FC<FileAttachmentProps> = ({ attachment }) => {
  const { chatActions } = useChat();
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await chatActions.downloadFile(attachment.id, attachment.fileName);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Tooltip title={`${attachment.fileName} (${formatFileSize(attachment.fileSize)})`}>
      <Chip
        icon={isDownloading ? <CircularProgress size={20} /> : <InsertDriveFile />}
        label={truncateFileName(attachment.fileName)}
        onClick={handleDownload}
        disabled={isDownloading}
        size="small"
        sx={{ mr: 1, mb: 1, cursor: 'pointer' }}
      />
    </Tooltip>
  );
};
