import { Dispatch } from "redux";
import { AUTHOR, Message } from "src/types";
import { AddChat, AddMessage, DeleteChat } from "./types";

export const ADD_CHAT = "MASSEGES::ADD_CHAT";
export const ADD_MESSAGE = "MASSEGES::ADD_MESSAGE";
export const DELETE_CHAT = "MASSEGES::DELETE_CHAT";

export const addChat = (chatName: string): AddChat => ({
  type: ADD_CHAT,
  chatName,
});

export const addMessage = (chatId: string, newMessage: Message): AddMessage => ({
  type: ADD_MESSAGE,
  chatId,
  newMessage,
});

export const deleteChat = (chatId: string): DeleteChat => ({
  type: DELETE_CHAT,
  chatId,
});

let timeout: NodeJS.Timeout;

export const addMesssageWithReplay =
  (chatName: string, newMessage: Message) => (dispatch: Dispatch) => {
    dispatch(addMessage(chatName, newMessage));

    if (newMessage.author !== AUTHOR.BOT) {
      if (timeout) {
        clearTimeout(timeout);
      }

      timeout = setTimeout(() => {
        dispatch(
          addMessage(chatName, {
            author: AUTHOR.BOT,
            text: "Im Bot",
          })
        );
      }, 1500);
    }
  };
