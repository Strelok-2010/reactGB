import { FC, useContext } from 'react';
import { ThemeContext } from 'src/utils/ThemeContext';
import style from './Theme.module.css';

export const Theme: FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={style.wrapper}>
      <p>theme: {theme === 'light' ? '🌞' : '🌙'}</p>
      <button onClick={toggleTheme}>toggle theme</button>
    </div>
  );
};
