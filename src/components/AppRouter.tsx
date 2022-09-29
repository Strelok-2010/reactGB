import { FC, useEffect, useState } from 'react';
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
import { db, firebaseAuth, getChats } from 'src/services/firebase';
import { useDispatch } from 'react-redux';
import { auth } from 'src/store/profile/slice';
import { onValue, ref } from 'firebase/database';

export const AppRouter: FC = () => {
  const dispatch = useDispatch();

  const [chats, setChats] = useState<any[]>([]);
  const [messages, setMessages] = useState<any>({});

  useEffect(() => {
    const authUnsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      console.log('user', user);
      dispatch(auth(!!user));
    });

    const chatsUnsubscribe = onValue(getChats(), (snapshot) => {
      const data = snapshot.val() || {};
      setChats([...Object.values(data)]);
    });

    const messagesUnsubscribe = onValue(ref(db, 'messages'), (snapshot) => {
      const data = snapshot.val() || {};
      setMessages(data);
    });

    return () => {
      authUnsubscribe();
      chatsUnsubscribe();
      messagesUnsubscribe();
    };
  }, [dispatch]);

  return (
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
          <Route index element={<ChatListPage chats={chats} />} />
          <Route
            path=":chatId"
            element={<ChatPage chats={chats} messages={messages} />}
          />
        </Route>
        <Route path="articles" element={<Articles />} />
        <Route path="articlesthunk" element={<ArticlesThunk />} />
      </Route>
      <Route path="*" element={<div>404 page</div>} />
    </Routes>
  );
};
