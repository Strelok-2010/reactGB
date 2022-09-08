import { useState, useEffect, FC } from 'react';
import { Form } from './components/Form';
import { MessageList } from './components/MessageList';
import { AUTHOR } from 'src/constants';
import { Message, Messages } from "src/types";


export const App: FC = () => {
  const [messages, setMessages] = useState<Messages>([]);

  const addMessage = (newMessage: Message) => {
    setMessages((prevMessage) => [...prevMessage, newMessage]);
    console.log(messages)
  }

  useEffect(() => {
    if (messages.length > 0 &&
      messages[messages.length - 1].author === AUTHOR.user
    ) {
      const timeout = setTimeout(() => {
        addMessage({
          author: AUTHOR.bot,
          text: 'Im Bot'
        });
      }, 1500)

      return () => clearTimeout(timeout);
    }
  }, [messages])

  return (
    <div className="App">
      <MessageList messages={messages} />
      <Form addMessage={addMessage} />
    </div>
  );
};
