import { FC, useEffect, useRef} from "react";
import style from "./MessageList.module.css";
import { Messages } from "src/types";
import { Chat } from "./../Chat/Chat";

interface MessageListProps {
  messages: Messages;
}

export const MessageList: FC<MessageListProps> = ({ messages }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current != null) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  });

  return (
    <div className={style.wrapper}>
      <div className={style.box}>
        <div>
          <Chat />
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
