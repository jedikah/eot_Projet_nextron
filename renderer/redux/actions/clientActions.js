import * as types from "../constants/clientActionTypes";

export const initClient = payload => ({
  type: types.INIT_CLIENT,
  payload
});

export const addClient = payload => ({
  type: types.ADD_CLIENT,
  payload
});
