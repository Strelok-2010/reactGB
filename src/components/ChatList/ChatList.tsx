import { FC, useEffect, useRef, useState } from 'react';
import { ListItem, List, ListSubheader, ListItemButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addChat, deleteChat } from 'src/store/messages/slice';
import { selectChats } from 'src/store/messages/selectots';
import style from './ChatList.module.css';

let chatName = '';

export const ChatList: FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const chats = useSelector(
    selectChats,
    (prev, next) => prev.length === next.length //shallowEqual
  );

  useEffect(() => {
    console.log('chats updated');
  }, [chats]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (value) {
      dispatch(addChat(value));
      setValue('');
    }
  };

  const onRemoveChat = () => {
    dispatch(deleteChat(chatName));
    chatName = '';
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
                fontFamily: '"Courier New", Courier, monospace',
                fontSize: '16px',
                fontWeight: '600',
                color: 'darkgreen',
                lineHeight: '35px',
              }}
            >
              <div className={style.title}>
                Чат:
                <span style={{ fontSize: '12px', color: 'red' }}>
                  {chatName}
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
                    to={`/chats/${chat.name}`}
                    onClick={() => (chatName = chat.name)}
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
              onClick={() => onRemoveChat()}
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
