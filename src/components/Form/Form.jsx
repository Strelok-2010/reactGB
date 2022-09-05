import { useState } from "react";
import style from "./Form.module.css";
// import { AUTHOR } from "src/constants";

export const Form = ({ addMessage }) => {
  const [author, setAuthor] = useState("");
  const [text, setText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    addMessage({
      author: 'USER',//AUTHOR.user, 
      text,
    });
    setText('');
  }

  return (
    <form className={style.card} onSubmit={handleSubmit}>
      <h3 className={style.title}>Форма отправки</h3>
      <input className={style.field} type="text" value={author} onChange={(event) => setAuthor(event.target.value)} placeholder="автор" disabled></input>
      <input className={style.field} type="text" value={text} onChange={(event) => setText(event.target.value)} placeholder="текст"></input>
      <button className={style.btn} disabled={!text}>Send</button>
      {/* <Button label="send" disabled={!text} /> */}
    </form>
  );
};
