import * as types from "../constants/settingActionTypes";

export const initSetting = payload => ({
  type: types.INIT_SETTING,
  payload
});

export const updateSetting = payload => ({
  type: types.UPDATE_SETTING,
  payload
});
