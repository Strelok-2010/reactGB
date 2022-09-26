import { GHANGE_NAME, TOGGLE_PROFILE } from './actions';
import { ProfileActions } from './types';




export interface ProfileState {
  name: string;
  visible: boolean;
}

const initialState: ProfileState = {
  name: 'gb',
  visible: true,
};





export const profileReducer = (
  state = initialState,
  action: ProfileActions
) => {
  switch (action.type) {
    case TOGGLE_PROFILE: {
      return {
        ...state,
        visible: !state.visible,
      };
    }
    case GHANGE_NAME: {
      return {
        ...state,
        name: action.name,
      };
    }
    default:
      return state;
  }
};
