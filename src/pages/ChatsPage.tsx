import { FC } from 'react';
import { ChatList } from 'src/components/ChatList';
import { Chat } from 'src/types';

interface ChatListProps {
  chats: Chat[];
  onAddChat: (chat: Chat) => void;
  removeChat: (id: string) => void;
}

export const ChatListPage: FC<ChatListProps> = ({
  chats,
  onAddChat,
  removeChat,
}) => {
  return (
    <>
      <div className="App">
        <ChatList chats={chats} onAddChat={onAddChat} removeChat={removeChat} />
      </div>
    </>
  );
};
