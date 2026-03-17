import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { chatAPI } from '../services/chatAPI';
import { ChatState, SendMessagePayload, UpdateMessagePayload } from '../types/chat';

const initialState: ChatState = {
  messages: [],
  log: null,
  isLoading: false,
  error: null,
  uploadProgress: null,
};

// Async Thunks
export const fetchMessages = createAsyncThunk(
  'chat/fetchMessages',
  async (_, { rejectWithValue }) => {
    try {
      return await chatAPI.getMessages();
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch messages');
    }
  }
);

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async (
    { message, files }: { message: SendMessagePayload; files?: File[] },
    { rejectWithValue, dispatch }
  ) => {
    try {
      dispatch(setUploadProgress(0));
      const result = await chatAPI.sendMessage(message, files, (progress) => {
        dispatch(setUploadProgress(progress));
      });
      dispatch(setUploadProgress(null));
      return result;
    } catch (error) {
      dispatch(setUploadProgress(null));
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to send message');
    }
  }
);

export const updateMessage = createAsyncThunk(
  'chat/updateMessage',
  async (payload: UpdateMessagePayload, { rejectWithValue }) => {
    try {
      return await chatAPI.updateMessage(payload);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to update message');
    }
  }
);

export const deleteMessage = createAsyncThunk(
  'chat/deleteMessage',
  async (id: number, { rejectWithValue }) => {
    try {
      await chatAPI.deleteMessage(id);
      return id;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to delete message');
    }
  }
);

export const downloadFile = createAsyncThunk(
  'chat/downloadFile',
  async ({ fileId, fileName }: { fileId: string; fileName: string }, { rejectWithValue }) => {
    try {
      return await chatAPI.downloadFile(fileId, fileName);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to download file');
    }
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addLog: (state, action: PayloadAction<string>) => {
      state.log = action.payload;
    },
    clearLog: (state) => {
      state.log = null;
    },
    setUploadProgress: (state, action: PayloadAction<number | null>) => {
      state.uploadProgress = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Messages
      .addCase(fetchMessages.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Send Message
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      })
      // Update Message
      .addCase(updateMessage.fulfilled, (state, action) => {
        const index = state.messages.findIndex((msg) => msg.id === action.payload.id);
        if (index !== -1) {
          state.messages[index] = action.payload;
        }
      })
      // Delete Message
      .addCase(deleteMessage.fulfilled, (state, action) => {
        state.messages = state.messages.filter((msg) => msg.id !== action.payload);
      });
  },
});

export const { addLog, clearLog, setUploadProgress, clearError } = chatSlice.actions;
export default chatSlice.reducer;
