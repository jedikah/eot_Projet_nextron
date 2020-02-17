import * as types from "../constants/settingActionTypes";

const initialState = {
  settings: []
};

const setting = (state = initialState, action) => {
  const newState = { ...state };
  const payload = action.payload;

  switch (action.type) {
    case types.INIT_SETTING:
      newState.settings = payload.settings;
      return newState;

    default:
      return state;
  }
};

export default setting;
