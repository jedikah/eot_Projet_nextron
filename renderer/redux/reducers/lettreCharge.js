import * as types from "../constants/lettreChargeActionTypes";
import * as DB from "../../models/index";

const initState = {
  lettreCharges: []
};

const lettreCharge = (state = initState, action) => {
  let newState = { ...state };
  let payload = action.payload;
  let { lettreCharges } = state;

  switch (action.type) {
    case types.INIT_LETTRE_CHARGE:
      newState.lettreCharges = payload.lettreCharges;
      return newState;

    case types.ADD_LETTRE_CHARGE:
      lettreCharges.push(payload.newLettreCharge);
      newState.lettreCharges = [...lettreCharges];
      return newState;

    case types.UPDATE_LETTRE_CHARGE:
      const indexLettre = lettreCharges.findIndex(
        item => item.IdTrav === payload.updateLettreCharge.IdTrav
      );
      lettreCharges[indexLettre] = payload.updateLettreCharge;
      newState.lettreCharges = [...lettreCharges];
      return newState;

    default:
      return state;
  }
};

export default lettreCharge;
