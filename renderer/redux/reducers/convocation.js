import * as types from "../constants/convocationActionTypes";

const initstate = {
  convocations: [],
  selectedConvocation: null
};

const convocation = (state = initstate, action) => {
  let newState = { ...state };
  let payload = action.payload;
  let { convocations } = state;

  switch (action.type) {
    case types.INIT_CONVOCATION:
      newState.convocations = payload.convocations;
      return newState;

    case types.SET_SELECTED_CONVOCATION:
      newState.selectedConvocation = payload.selectedConvocation;
      return newState;

    case types.ADD_CONVOCATION:
      convocations.push(payload.newConvocation);
      newState.convocations = [...convocations];
      return newState;

    case types.UPDATE_CONVOCATION:
      const indexConvocation = convocations.findIndex(item => {
        return item.NumRegistre === payload.lastNumRegistre;
      });
      convocations[indexConvocation] = payload.updateConvocation;
      newState.convocations = [...convocations];
      return newState;

    default:
      return state;
  }
};

export default convocation;
