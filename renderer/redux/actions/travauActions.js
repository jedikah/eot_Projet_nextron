import * as types from "../constants/travauActionTypes";

export const initTravau = payload => ({
  type: types.INIT_TRAVAU,
  payload
});

export const addTravaux = payload => ({
  type: types.ADD_TRAVAU,
  payload
});
