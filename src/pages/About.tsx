import { FC } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { StoreState } from 'src/store';
import { toggleProfile } from 'src/store/profile/slice';
import { selectVisible } from 'src/store/profile/selectors';
import style from './Profile.module.css';

export const About: FC = ({ visible, toggle }: any) => (
  <div className={style.wrapper}>
    <h2 className={style.titel}>About page</h2>
    <p className={style.text}>visible:</p>
    <input type="checkbox" checked={visible} readOnly data-testid="input" />
    <button
      onClick={() => toggle()}
      className={style.button}
      data-testid="button"
    >
      chang visible
    </button>
  </div>
);

const mapStateToProps = (state: StoreState) => ({
  visible: selectVisible(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggle: () => dispatch(toggleProfile()),
});

export const AboutWithConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(About);
