import * as types from "../constants/lettreChargeActionTypes";

export const initLettreCharge = payload => ({
  type: types.INIT_LETTRE_CHARGE,
  payload
});

export const addLettreCharge = payload => ({
  type: types.ADD_LETTRE_CHARGE,
  payload
});
