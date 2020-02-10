import * as types from "../constants/pvActionTypes";

export const addPv = payload => ({
  type: types.ADD_PV,
  payload
});
