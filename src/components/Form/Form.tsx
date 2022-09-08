import * as React from 'react';
import { FC, useState } from "react";
import style from "./Form.module.css";
import { Message } from "src/types";
import { AUTHOR } from "src/constants";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

const MyButton = styled(Button)({
  width: 80,
});

interface FormProps {
  addMessage: (newMessage: Message) => void;
}

export const Form: FC<FormProps> = ({ addMessage }) => {
  const [author, setAuthor] = useState("");
  const [text, setText] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addMessage({
      author: AUTHOR.user, //'USER'
      text,
    });
    setText('');
  }

  return (
    <form className={style.card} onSubmit={handleSubmit} role="my-form">
      <h3 className={style.title}>Форма отправки</h3>
      <input className={style.field} type="text" value={author} onChange={(event) => setAuthor(event.target.value)} placeholder="автор" disabled></input>
      <TextField
        value={text}
        onChange={(event) => setText(event.target.value)}
        inputProps={{ 'data-testid': 'input' }}
        size="small"
      />
      <MyButton
        type="submit"
        variant="contained"
        size="small"
        disabled={!text}
        data-testid="button"
      >
        Send
      </MyButton>
    </form>
  );
};
