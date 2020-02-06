import * as types from "../constants/convocationActionTypes";

const initstate = {
  convocations: []
};

const convocation = (state = initstate, action) => {
  let newState = { ...state };
  let payload = action.payload;

  switch (action.type) {
    case types.INIT_CONVOCATION:
      newState.convocations = payload.convocations;
      return newState;

    default:
      return state;
  }
};

export default convocation;
