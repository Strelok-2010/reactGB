import { CircularProgress } from '@mui/material';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from 'src/services/firebase';
import style from './Sign.module.css';

export const SignUn: FC = () => {
  const [login, setLogin] = useState('');
  const [passowrd, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      await signUp(login, passowrd);
      navigate('/signin');
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
      <h2>Sing Up</h2>
      <form onSubmit={handleSubmit} className={style.form}>
        <p>Login</p>
        <input
          type="email"
          onChange={(e) => setLogin(e.target.value)}
          value={login}
          data-testid="login"
          required
        />
        <p>Password</p>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={passowrd}
          data-testid="passowrd"
          required
          pattern="[a-zA-z0-9_\.-]{6,}"
          onInvalid={(e) =>
            (e.target as HTMLInputElement).setCustomValidity(
              'min length to be 6'
            )
          }
        />
        <br />
        <button data-testid="btn-login">Create user</button>
      </form>
      {loading && <CircularProgress />}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};
