import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth } from 'src/store/profile/slice';
import style from './Sign.module.css';

export const SignIn: FC = () => {
  const [login, setLogin] = useState('');
  const [passowrd, setPassword] = useState('');
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);

    if (login === 'gb' && passowrd === 'gb') {
      dispatch(auth(true));
      // navigate('/chats', {replace: true});
      navigate(-1);
    } else {
      setError(true);
    }
  };

  return (
    <div className={style.wrapper}>
      <h2>Sing In</h2>
      <form onSubmit={handleSubmit} className={style.form}>
        <p>Login</p>
        <input
          type="text"
          onChange={(e) => setLogin(e.target.value)}
          value={login}
          data-testid="login"
        />
        <p>Password</p>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={passowrd}
          data-testid="passowrd"
        />
        <br />
        <button data-testid="btn-login">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>Логин или пароль не верны</p>}
    </div>
  );
};
