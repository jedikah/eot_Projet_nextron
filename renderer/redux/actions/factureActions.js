import * as types from "../constants/factureActionTypes";

export const addFacture = payload => ({
  type: types.ADD_FACTURE,
  payload
});
