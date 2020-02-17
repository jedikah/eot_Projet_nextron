import * as types from "../constants/travauActionTypes";

export const initTravau = payload => ({
  type: types.INIT_TRAVAU,
  payload
});

export const addTravaux = payload => ({
  type: types.ADD_TRAVAU,
  payload
});

export const setSelectedTravau = payload => ({
  type: types.SET_SELECTED_TRAVAU,
  payload
});

export const updateTravau = payload => ({
  type: types.UPDATE_TRAVAU,
  payload
});

export const updateTravauFact = payload => ({
  type: types.UPDATE_TRAVAU_FACT,
  payload
});
