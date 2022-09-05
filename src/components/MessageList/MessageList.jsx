import { useEffect, useRef } from 'react'
import style from "./MessageList.module.css";

export const MessageList = ({ messages }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current.scrollIntoView({ behavior: 'smooth' });
  });

  return (
    <div className={style.box}>
      <h3 className={style.title}>Сообщения</h3>
      <div className={style.message_scroll}>
        <ul className={style.list}>
          {messages.map((message, idx) => (
            <li key={idx}>
              {message.author} : {message.text}
            </li>
          ))}
        </ul>
        <div ref={scrollRef} />
      </div>
    </div>
  );
};
