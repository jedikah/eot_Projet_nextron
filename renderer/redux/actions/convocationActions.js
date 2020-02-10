import * as types from "../constants/convocationActionTypes";

export const initConvocation = payload => ({
  type: types.INIT_CONVOCATION,
  payload
});

export const addConvocations = payload => ({
  type: types.ADD_CONVOCATION,
  payload
});