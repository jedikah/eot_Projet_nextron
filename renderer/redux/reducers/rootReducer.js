import { combineReducers } from "redux";

import client from "./client";
import travau from "./travau";
import facture from "./facture";
import convocation from "./convocation";
import pv from "./pv";
import lettreCharge from "./lettreCharge";
import signIn from "./signIn";

const rootReducer = combineReducers({
  client,
  travau,
  facture,
  convocation,
  pv,
  lettreCharge,
  signIn
});

export default rootReducer;
