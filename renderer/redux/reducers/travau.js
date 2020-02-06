import * as types from "../constants/travauActionTypes";

const initState = {
  travaux: [],
  selectedTravau: null
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
      travaux.push(payload.newTrav);
      newState.travaux = [...travaux];
      return newState;

    case types.SET_SELECTED_TRAVAU:
      newState.selectedTravau = payload.selectedTravau;
      return newState;

    case types.UPDATE_TRAVAU:
      travaux.map(function(IdTrav, index) {});
      return newState;

    default:
      return state;
  }
};

export default travau;
