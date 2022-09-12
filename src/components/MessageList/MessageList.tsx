import { FC, useEffect, useRef } from 'react';
import style from './MessageList.module.css';
import { Chat, Message } from 'src/types';
import { ChatList } from 'src/components/ChatList';

interface MessageListProps {
  messages: Message[];
  chats: Chat[];
  onAddChat: (chat: Chat) => void;
  removeChat: (id: string) => void;
}

export const MessageList: FC<MessageListProps> = ({
  messages,
  chats,
  onAddChat,
  removeChat,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current != null) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  });

  return (
    <div className={style.wrapper}>
      <div className={style.box}>
        <div>
          <ChatList
            chats={chats}
            onAddChat={onAddChat}
            removeChat={removeChat}
          />
        </div>
        <div className={style.box2}>
          <h3 className={style.title}>Сообщения</h3>
          <div className={style.message_scroll}>
            <ul className={style.list}>
              {messages.map((message, idx) => (
                <li key={idx} data-testid="li">
                  {message.author} : {message.text}
                </li>
              ))}
            </ul>
            <div ref={scrollRef} />
          </div>
        </div>
      </div>
    </div>
  );
};
