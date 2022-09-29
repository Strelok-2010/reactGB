import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { logOut } from 'src/services/firebase';
import { StoreState } from 'src/store';
import { auth } from 'src/store/profile/slice';
import style from './Header.module.css';

const nav = [
  {
    name: 'Main',
    path: '/',
  },
  {
    name: 'Chats',
    path: '/chats',
  },
  {
    name: 'Profile',
    path: '/profile',
  },
  {
    name: 'About',
    path: '/about',
  },
  {
    name: 'Articles',
    path: '/articles',
  },
  {
    name: 'ArticlesThunk',
    path: '/articlesThunk',
  },
];

export const Header: FC = () => {
  const isAuth = useSelector((state: StoreState) => state.profile.isAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(auth(false));
    }
  };

  return (
    <>
      <header style={{ backgroundColor: 'grey' }}>
        <ul className={style.ul}>
          {nav.map((item, idx) => (
            <li key={idx}>
              <NavLink
                to={item.path}
                style={({ isActive }) => ({
                  color: isActive ? 'green' : 'blue',
                })}
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </header>
      <main>
        {isAuth && (
          <button
            onClick={handleLogout}
            className={`${style.btnLog} ${style.btnLogOut}`}
          >
            LogOut
          </button>
        )}
        {!isAuth && (
          <>
            <button
              onClick={() => navigate('/signin')}
              className={`${style.btnLog} ${style.btnLogIn}`}
            >
              singIn
            </button>
            <button
              onClick={() => navigate('/signup')}
              className={`${style.btnLog} ${style.btnLogIn}`}
            >
              singUp
            </button>
          </>
        )}
        <Outlet />
      </main>
    </>
  );
};
