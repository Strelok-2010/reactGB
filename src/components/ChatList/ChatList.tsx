import React, { FC, useEffect, useRef, useState } from 'react';
import { ListItem, List, ListSubheader, ListItemButton } from '@mui/material';
import { customAlphabet } from 'nanoid';
import { Chat } from 'src/types';
import { Link } from 'react-router-dom';
import style from './ChatList.module.css';

const nanoid = customAlphabet('1234567890abcdef', 10);

interface ChatListProps {
  chats: Chat[];
  onAddChat: (chat: Chat) => void;
  removeChat: (id: string) => void;
}

let btnID = '';
let nameChat = '';

export const ChatList: FC<ChatListProps> = ({
  chats,
  onAddChat,
  removeChat,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (value) {
      onAddChat({
        id: nanoid(),
        name: value,
      });
      setValue('');
    }
  };

  const handelButtonRemove = (id: string) => {
    removeChat(id);
    nameChat = '';
  };

  const handelButtonChat = (id: string, name: string) => {
    btnID = id;
    nameChat = name;
  };

  useEffect(() => {
    if (scrollRef.current != null) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  });

  return (
    <>
      <div className={style.wrapper}>
        <List
          sx={{
            width: '150px',
            height: '100%',
            maxWidth: 360,
            bgcolor: '#f3f3f3',
          }}
          aria-label="contacts"
          subheader={
            <ListSubheader
              sx={{
                bgcolor: '#f3f3f3',
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: '16px',
                fontWeight: '600',
                color: 'darkgreen',
                lineHeight: '35px',
              }}
            >
              <div className={style.title}>
                Чат:{' '}
                <span style={{ fontSize: '12px', color: 'red' }}>
                  {nameChat}
                </span>
              </div>
            </ListSubheader>
          }
        >
          <div className={style.message_scroll}>
            {chats.map((chat) => (
              <ListItemButton key={chat.id} sx={{ padding: 0 }}>
                <ListItem sx={{ paddingTop: 0, paddingBottom: 0 }}>
                  <Link
                    to={`/chats/${chat.id}`}
                    onClick={() => {
                      handelButtonChat(chat.id, chat.name);
                    }}
                  >
                    {chat.name}
                  </Link>
                </ListItem>
              </ListItemButton>
            ))}
            <div ref={scrollRef} />
          </div>
          <form onSubmit={handleSubmit}>
            <input
              value={value}
              onChange={(event) => setValue(event.target.value)}
              className={style.input}
            />
            <br />
            <button className={style.buttonCreate}>create chat</button>
            <button
              className={style.buttonCreate}
              onClick={() => handelButtonRemove(btnID)}
              type="button"
            >
              remove chat
            </button>
          </form>
        </List>
      </div>
    </>
  );
};
