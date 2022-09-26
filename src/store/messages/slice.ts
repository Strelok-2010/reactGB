import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { AUTHOR, Message, MessagesWithId } from 'src/types';

export interface AddMessage {
  chatName: string;
  message: Message;
}

const initialState: MessagesWithId = {
  first: [{ id: '1', author: AUTHOR.USER, text: 'hello, world' }],
  second: [{ id: '2', author: AUTHOR.BOT, text: 'hello, im bot' }],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addChat: (state, action: PayloadAction<string>) => {
      state[action.payload] = [];
    },

    deleteChat: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },

    addMessage: (state, action: PayloadAction<AddMessage>) => {
      const { author, text } = action.payload.message;
      state[action.payload.chatName].push({
        id: nanoid(),
        author,
        text,
      });
    },
  },
});

let timeout: NodeJS.Timeout;

export const addMessagesWithReply = createAsyncThunk(
  'messages/addMessagesWithReply',
  (payload: AddMessage, { dispatch }) => {
    const { chatName, message } = payload;

    dispatch(addMessage({ chatName, message }));

    if (message.author !== AUTHOR.BOT) {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        dispatch(
          addMessage({
            chatName,
            message: { author: AUTHOR.BOT, text: 'Im Bot' },
          })
        );
      }, 1500);
    }
  }
);

export const { addChat, deleteChat, addMessage } = messagesSlice.actions;
export const messagesReducer = messagesSlice.reducer;
