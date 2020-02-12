import * as types from "../constants/pvActionTypes";

export const addPv = payload => ({
  type: types.ADD_PV,
  payload
});

export const updatePv = payload => ({
  type: types.UPDATE_PV,
  payload
});

export const initPv = payload => ({
  type: types.INIT_PV,
  payload
});
