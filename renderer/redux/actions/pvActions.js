import * as types from "../constants/pvActionTypes";

export const addPv = payload => ({
  type: types.ADD_PV
});

export const initPv = payload => ({
  type: types.INIT_PV,
  payload
});
