import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { store } from 'src/store';
import { changeName, toggleProfile } from 'src/store/profile/actions';
import { ProfileState } from 'src/store/profile/reducer';
import style from './Profile.module.css';

export const Profile: FC = () => {
  const state = store.getState();
  console.log(state);

  const dispatch = useDispatch();

  const name = useSelector((state: ProfileState) => state.name);
  const visible = useSelector((state: ProfileState) => state.visible);
  const [value, setValue] = useState('');

  return (
    <div className={style.wrapper}>
      <h2 className={style.titel}>Profile page</h2>
      <p className={style.text}>visible:</p>
      <input type="checkbox" checked={visible} readOnly data-testid="input" />
      <button
        onClick={() => dispatch(toggleProfile())}
        className={style.button}
        data-testid="button"
      >
        chang visible
      </button>
      <br /> <br />
      <p className={style.text} data-testid="name">
        name: {name}
      </p>
      <p className={style.text}>Change name</p>
      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        data-testid="inputName"
      />
      <button
        onClick={() => dispatch(changeName(value))}
        className={style.button}
        data-testid="buttonName"
      >
        change name
      </button>
    </div>
  );
};
