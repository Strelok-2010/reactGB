import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Main } from 'src/pages/Main';
import { Header } from './Header';
import { Profile } from 'src/pages/Profile';
import { ChatPage } from 'src/pages/ChatPage';
import { ChatListPage } from 'src/pages/ChatsPage';
import { AboutWithConnect } from 'src/pages/About';
import { Articles } from 'src/pages/Articles/Articles';
import { SignIn } from 'src/pages/SignIn';
import { SignUn } from 'src/pages/SingUp';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { ArticlesThunk } from 'src/pages/Articles/ArticlesThunk';

export const AppRouter: FC = () => (
  <Routes>
    <Route path="/" element={<Header />}>
      <Route index element={<Main />} />
      <Route
        path="profile"
        element={<PrivateRoute component={<Profile />} />}
      />
      <Route path="about" element={<AboutWithConnect />} />
      <Route path="signin" element={<PublicRoute component={<SignIn />} />} />
      <Route path="signup" element={<SignUn />} />
      <Route path="chats" element={<PrivateRoute />}>
        <Route index element={<ChatListPage />} />
        <Route path=":chatId" element={<ChatPage />} />
      </Route>
      <Route path="articles" element={<Articles />} />
      <Route path="articlesthunk" element={<ArticlesThunk />} />
    </Route>
    <Route path="*" element={<div>404 page</div>} />
  </Routes>
);
