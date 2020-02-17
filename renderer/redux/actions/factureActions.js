import * as types from "../constants/factureActionTypes";

export const addFacture = payload => ({
  type: types.ADD_FACTURE,
  payload
});

export const initFacture = payload => ({
  type: types.INIT_FACTURE,
  payload
});

export const setSelectedFacture = payload => ({
  type: types.SET_SELECTED_FACTURE,
  payload
});
