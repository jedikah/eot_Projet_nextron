import * as types from "../constants/clientActionTypes";

export const addClient = payload => ({
  type: types.ADD_CLIENT,
  payload
});
