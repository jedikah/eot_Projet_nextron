import * as types from "../constants/convocationActionTypes";

export const initConvocation = payload => ({
  type: types.INIT_CONVOCATION,
  payload
});

export const addConvocations = payload => ({
  type: types.ADD_CONVOCATION,
  payload
});

export const setSelectedConvocations = payload => ({
  type: types.SET_SELECTED_CONVOCATION,
  payload
});

export const updateConvocation = payload => ({
  type: types.UPDATE_CONVOCATION,
  payload
});
