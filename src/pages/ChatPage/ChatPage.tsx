import { FC } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Form } from 'src/components/Form';
import { MessageList } from 'src/components/MessageList';
import style from './ChatPage.module.css';
import { ChatList } from 'src/components/ChatList';

export const ChatPage: FC<any> = ({ chats, messages }) => {
  const { chatId } = useParams();

  if (chatId && !messages[chatId]) {
    return <Navigate to="/chats" replace />;
  }

  const prepareMessages = [
    ...Object.values((chatId && messages[chatId].messages) || {}),
  ];

  return (
    <div className="App">
      <div className={style.box}>
        <ChatList chats={chats} />
        <MessageList messages={prepareMessages} title={'Сообщения'} />
      </div>
      <Form />
    </div>
  );
};
