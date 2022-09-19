import { FC, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Form } from 'src/components/Form';
import { MessageList } from 'src/components/MessageList';
import { AUTHOR } from 'src/constants';
import { Chat, Message, Messages } from 'src/types';

interface ChatPageProps {
  chats: Chat[];
  onAddChat: (chat: Chat) => void;
  messages: Messages;
  onAddMessage: (chatId: string, newMessage: Message) => void;
  removeChat: (id: string) => void;
}

export const ChatPage: FC<ChatPageProps> = ({
  chats,
  onAddChat,
  messages,
  onAddMessage,
  removeChat,
}) => {
  const { chatId } = useParams();

  useEffect(() => {
    if (
      chatId &&
      messages[chatId]?.length > 0 &&
      messages[chatId][messages[chatId].length - 1].author === AUTHOR.user
    ) {
      const timeout = setTimeout(() => {
        onAddMessage(chatId, {
          author: AUTHOR.bot,
          text: 'Im Bot',
        });
      }, 1500);

      return () => clearTimeout(timeout);
    }
  }, [chatId, messages, onAddMessage]);

  if (chatId && !messages[chatId]) {
    return <Navigate to="/chats" replace />;
  }

  return (
    <>
      <div className="App">
        <MessageList
          messages={chatId ? messages[chatId] : []}
          chats={chats}
          onAddChat={onAddChat}
          removeChat={removeChat}
        />
        <Form addMessage={onAddMessage} />
      </div>
    </>
  );
};
