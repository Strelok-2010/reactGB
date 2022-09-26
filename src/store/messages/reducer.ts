import { Reducer } from 'redux';
import { AUTHOR } from 'src/types';
import { Messages } from 'src/types';
import { ADD_CHAT, ADD_MESSAGE, DELETE_CHAT } from './actions';
import { MessagesActions } from './types';

const initialState: Messages = {
  first: [{ author: AUTHOR.USER, text: 'hello, world' }],
  second: [{ author: AUTHOR.BOT, text: 'hello, im bot' }],
};

export const messagesReducer: Reducer<Messages, MessagesActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ADD_CHAT: {
      return {
        ...state,
        [action.chatName]: [],
      };
    }
    case ADD_MESSAGE: {
      return {
        ...state,
        [action.chatId]: [...state[action.chatId], action.newMessage],
      };
    }
    case DELETE_CHAT: {
      const messages = { ...state };
      delete messages[action.chatId];
      return messages;
    }
    default:
      return state;
  }
};
