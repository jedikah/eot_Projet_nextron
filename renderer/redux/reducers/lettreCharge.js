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
    case types.ADD_LETTRE_CHARGE:
      lettreCharges.push(payload.newLettreCharge);
      newState.lettreCharges = [...lettreCharges];
      return newState;

    default:
      return state;
  }
};

export default lettreCharge;
