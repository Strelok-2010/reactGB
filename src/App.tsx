import { useState, FC } from 'react';
import { Chat, Message, Messages } from 'src/types';
import { Routes, Route } from 'react-router-dom';
import { Main } from './pages/Main';
import { Profile } from './pages/Profile';
import { AboutWithConnect } from './pages/About';
import { ChatPage } from './pages/ChatPage';
import { Header } from './components/Header';
import { ChatListPage } from './pages/ChatsPage';
import { Provider } from 'react-redux';
import { store } from './store';

const defaultChats: Chat[] = [
  {
    id: '1',
    name: 'first',
  },
  {
    id: '2',
    name: 'second',
  },
];

const defaultMessages: Messages = {
  '1': [{ author: 'USER', text: 'hello, world' }], //AUTHOR.USER
  '2': [{ author: 'BOT', text: 'hello, im bot' }], //AUTHOR.BOT
};

export const App: FC = () => {
  const [chats, setChats] = useState<Chat[]>(defaultChats); //added line
  const [messages, setMessages] = useState<Messages>(defaultMessages);

  const onAddChat = (newChat: Chat) => {
    setChats([...chats, newChat]);
    setMessages({ ...messages, [newChat.id]: [] });
  };

  const onAddMessage = (chatId: string, newMessage: Message) => {
    setMessages({
      ...messages,
      [chatId]: [...messages[chatId], newMessage],
    });
  };

  const removeChat = (id: string) => {
    setChats(chats.filter((el) => el.id !== id));
    const newMessages = { ...messages };
    delete newMessages[id];

    setMessages(newMessages);
  };

  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Main />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<AboutWithConnect />} />
          <Route path="chats">
            <Route
              index
              element={
                <ChatListPage
                  chats={chats}
                  onAddChat={onAddChat}
                  removeChat={removeChat}
                />
              }
            />
            <Route
              path=":chatId"
              element={
                <ChatPage
                  chats={chats}
                  onAddChat={onAddChat}
                  messages={messages}
                  onAddMessage={onAddMessage}
                  removeChat={removeChat}
                />
              }
            />
          </Route>
          <Route path="*" element={<div>404 page</div>} />
        </Route>
      </Routes>
    </Provider>
  );
};
