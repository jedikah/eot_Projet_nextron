import * as types from "../constants/settingActionTypes";

export const initSetting = payload => ({
  type: types.INIT_SETTING,
  payload
});
