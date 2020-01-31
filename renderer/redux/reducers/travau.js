import * as types from "../constants/travauActionTypes";
import * as DB from "../../models/index";

let path = DB.homeDir("ECM");
path += "EMC.sqlite";
const db = DB.connect(path);

const initState = {
  travaux: DB.selectTravaux(db).travaux
};

const travau = (state = initState, action) => {
  let newState = { ...state };
  let payload = action.payload;
  let { travaux } = state;

  switch (action.type) {
    case types.ADD_TRAVAU:
      travaux.push(payload.newTravau);
      newState.travaux = [...travaux];
      return newState;

    default:
      return state;
  }
};

export default travau;
