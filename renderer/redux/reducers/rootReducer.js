import { combineReducers } from "redux";

import client from "./client";
import travau from "./travau";
import facture from "./facture";
import convocation from "./convocation";
import pv from "./pv";
import lettreCharge from "./lettreCharge";
import user from "./user";
import menu from "./menu";
import setting from "./setting";

const rootReducer = combineReducers({
  client,
  travau,
  facture,
  convocation,
  pv,
  lettreCharge,
  user,
  menu,
  setting
});

export default rootReducer;
