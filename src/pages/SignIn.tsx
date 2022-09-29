import { CircularProgress } from '@mui/material';
import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logIn } from 'src/services/firebase';
import style from './Sign.module.css';

export const SignIn: FC = () => {
  const [login, setLogin] = useState('');
  const [passowrd, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError('');
    setLoading(true);

    try {
      await logIn(login, passowrd);
      navigate('/chats');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('error');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style.wrapper}>
      <h2>Sing In</h2>
      <form onSubmit={handleSubmit} className={style.form}>
        <p>Login</p>
        <input
          type="email"
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
      {loading && <CircularProgress />}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};
