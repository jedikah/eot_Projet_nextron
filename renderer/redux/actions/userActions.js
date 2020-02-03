import * as types from "../constants/userActionTypes";

export const initUser = payload => ({
  type: types.INIT_USER,
  payload
});
