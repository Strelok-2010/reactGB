import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { toggleProfile } from 'src/store/profile/actions';
import { ProfileState } from 'src/store/profile/reducer';
import style from './Profile.module.css';

export const About: FC = ({ visible, toggle }: any) => {
  return (
    <div className={style.wrapper}>
      <h2 className={style.titel}>About page</h2>
      <p className={style.text}>visible:</p>
      <input type="checkbox" checked={visible} readOnly />
      <button onClick={() => toggle()} className={style.button}>
        chang visible
      </button>
    </div>
  );
};

const mapStateToProps = (state: ProfileState) => ({
  visible: state.visible,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggle: () => dispatch(toggleProfile()),
});

export const AboutWithConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(About);
