import * as types from "../constants/pvActionTypes";

export const initPv = payload => ({
  type: types.INIT_PV,
  payload
});
