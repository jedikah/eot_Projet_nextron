import * as types from "../constants/travauActionTypes";

const initState = {
  travaux: []
};

const travau = (state = initState, action) => {
  let newState = { ...state };
  let payload = action.payload;
  let { travaux } = state;

  switch (action.type) {
    case types.INIT_TRAVAU:
      newState.travaux = payload.travaux;
      return newState;

    case types.ADD_TRAVAU:
      travaux.push(payload.newTravau);
      newState.travaux = [...travaux];
      return newState;

    default:
      return state;
  }
};

export default travau;
