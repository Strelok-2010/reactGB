import { FC } from 'react';
import { ChatList } from 'src/components/ChatList';

export const ChatListPage: FC<any> = ({ chats }) => (
  <div className="App">
    <ChatList chats={chats} />
  </div>
);
