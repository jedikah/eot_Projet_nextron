import * as types from "../constants/factureActionTypes";

const initState = {
  factures: [],
  selectedFacture: null,
  selectedTravauxByFacture: [],
  CountFactures: 0,
  facturesBySearchName: [],
  IdCliFromFacture: []
};

const facture = (state = initState, action) => {
  let newState = { ...state };
  let payload = action.payload;
  let { factures, selectedTravauxByFacture } = state;

  switch (action.type) {
    case types.ADD_FACTURE:
      factures.push(payload.newFacture);
      newState.factures = [...factures];
      return newState;

    case types.INIT_FACTURE:
      newState.factures = payload.factures;
      newState.CountFactures = payload.CountFactures;
      newState.IdCliFromFacture = payload.IdCliFromFacture;
      return newState;

    case types.SET_SELECTED_FACTURE:
      newState.selectedFacture = payload.selectedFacture;
      newState.selectedTravauxByFacture = payload.selectedTravauxByFacture;
      return newState;

    case types.UPDATE_SELECTED_FACTURE:
      selectedTravauxByFacture = [];
      payload.selectedTravauxI.forEach(item => {
        item.IdFact = payload.IdFact;
        selectedTravauxByFacture.push(item);
      });
      payload.selectedTravauxII.forEach(item => {
        item.IdFact = "";
        selectedTravauxByFacture.push(item);
      });
      newState.selectedTravauxByFacture = selectedTravauxByFacture;
      newState.selectedFacture = payload.selectedFact;
      return newState;

    case types.SET_SELECT_FACTURE_BY_SEARCH_NAME:
      newState.facturesBySearchName = payload.factures;
      return newState;

    default:
      return state;
  }
};

export default facture;
