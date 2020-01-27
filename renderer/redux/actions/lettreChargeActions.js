import * as types from "../constants/lettreChargeActionTypes";

export const addLettreCharge = payload => ({
  type: types.ADD_LETTRE_CHARGE,
  payload
});
