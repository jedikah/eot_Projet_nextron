import * as types from "../constants/lettreChargeActionTypes";
import * as DB from "../../models/index";

let path = DB.homeDir("ECM");
path += "EMC.sqlite";
const db = DB.connect(path);

const initState = {
  lettreCharges: DB.selectLetreCharges(db).lettreCharges
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
