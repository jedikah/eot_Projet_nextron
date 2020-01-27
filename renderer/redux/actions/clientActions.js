import * as types from "../constants/clientActionTypes";

export const addClients = payload => ({
  type: types.ADD_CLIENT,
  payload
});
