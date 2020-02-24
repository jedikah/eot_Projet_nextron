import * as types from "../constants/userActionTypes";

export const initUser = payload => ({
  type: types.INIT_USER,
  payload
});

export const updateUser = payload => ({
  type: types.UPDATE_USER,
  payload
});

export const setMax = payload => ({
  type: types.SETMAX,
  payload
});
