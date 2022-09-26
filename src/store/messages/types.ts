import { Message } from 'src/types';
import { ADD_CHAT, ADD_MESSAGE, DELETE_CHAT } from './actions';

export type MessagesActions = AddChat | AddMessage | DeleteChat;

export interface AddChat {
  type: typeof ADD_CHAT;
  chatName: string;
}

export interface AddMessage {
  type: typeof ADD_MESSAGE;
  chatId: string;
  newMessage: Message;
}

export interface DeleteChat {
  type: typeof DELETE_CHAT;
  chatId: string;
}
