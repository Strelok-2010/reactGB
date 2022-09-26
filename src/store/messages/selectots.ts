import { nanoid } from 'nanoid';
import { StoreState } from '..';

export const selectMasseges = (state: StoreState) => state.messages;
export const selectChats = (state: StoreState) =>
  Object.keys(state.messages).map((chatName) => ({
    id: nanoid(),
    name: chatName,
  }));
