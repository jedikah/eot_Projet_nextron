import * as types from "../constants/factureActionTypes";

const initState = {
  factures: [],
  selectedFacture: null
};

const facture = (state = initState, action) => {
  let newState = { ...state };
  let payload = action.payload;
  let { factures } = state;

  switch (action.type) {
    case types.ADD_FACTURE:
      factures.push(payload.newFacture);
      newState.factures = [...factures];
      return newState;

    case types.INIT_FACTURE:
      newState.factures = payload.factures;
      return newState;

    case types.SET_SELECTED_FACTURE:
      newState.selectedFacture = payload.selectedFacture;
      return newState;

    default:
      return state;
  }
};

export default facture;
