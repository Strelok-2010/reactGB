export interface Message {
  author: string;
  text: string;
}

export interface MessageWithId extends Message {
  id: string;
}

export type Messages = Record<string, Message[]>;

export type MessagesWithId = Record<string, MessageWithId[]>;

export interface Chat {
  id: string;
  name: string;
}

export enum AUTHOR {
  USER = 'USER',
  BOT = 'BOT',
}
