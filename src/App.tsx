import { FC, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { ThemeContext } from './utils/ThemeContext';
import { AppRouter } from './components/AppRouter';

export const App: FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Provider store={store}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <AppRouter />
      </ThemeContext.Provider>
    </Provider>
  );
};
