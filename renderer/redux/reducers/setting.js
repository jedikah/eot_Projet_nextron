import * as types from "../constants/settingActionTypes";

const initialState = {
  settings: []
};

const setting = (state = initialState, action) => {
  const newState = { ...state };
  const payload = action.payload;
  const { settings } = state;

  switch (action.type) {
    case types.INIT_SETTING:
      newState.settings = payload.settings;
      return newState;
    case types.UPDATE_SETTING:
      const indexSetting = settings.findIndex(item => {
        return (
          item.IdUser === payload.IdUser &&
          item.NameSetting === payload.NameSetting
        );
      });
      settings[indexSetting].Value = payload.Value;
      newState.settings = [...settings];
      return newState;
    default:
      return state;
  }
};

export default setting;
