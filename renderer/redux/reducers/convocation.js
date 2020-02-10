import * as types from "../constants/convocationActionTypes";

const initstate = {
  convocations: [],
  convocationItems: []
};

const convocation = (state = initstate, action) => {
  let newState = { ...state };
  let payload = action.payload;
  let { convocations, convocationItems } = state;

  switch (action.type) {
    case types.INIT_CONVOCATION:
      newState.convocations = payload.convocations;
      return newState;

    case types.ADD_CONVOCATION:
      convocations.push(payload.newConvocation);
      newState.convocations = [...convocations];
      return newState;

    case types.SET_CONVOCATION_ITEMS:
      convocationItems = payload.setItems;
      newState.convocationItems = convocationItems;
      return newState;

    default:
      return state;
  }
};

export default convocation;
