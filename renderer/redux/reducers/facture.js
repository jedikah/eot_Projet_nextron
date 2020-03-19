import * as types from "../constants/factureActionTypes";

const initState = {
  factures: [],
  selectedFacture: null,
  selectedTravauxByFacture: [],
  beforeSelectedTravauxByFacture: [],
  CountFactures: 0,
  facturesBySearchName: [],
  IdCliFromFacture: [],
  lastPageChange: 1
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
      newState.CountFactures = payload.CountFactures;
      newState.lastPageChange = payload.lastPageChange;

      return newState;

    case types.SET_SELECTED_FACTURE:
      newState.selectedFacture = payload.selectedFacture;
      newState.selectedTravauxByFacture = payload.selectedTravauxByFacture;
      newState.IdCliFromFacture = payload.IdCliFromFacture;
      newState.beforeSelectedTravauxByFacture =
        payload.selectedTravauxByFacture;
      return newState;

    case types.SET_BEFORE_SET_SELECTED_FACTURE:
      let beforeSelectedTravauxByFacture = [];

      payload.selectedTravauxI.forEach(item => {
        item.IdFact = payload.IdFact;
        beforeSelectedTravauxByFacture = [
          ...beforeSelectedTravauxByFacture,
          item
        ];
      });
      payload.selectedTravauxII.forEach(item => {
        item.IdFact = "";
        beforeSelectedTravauxByFacture = [
          ...beforeSelectedTravauxByFacture,
          item
        ];
      });

      newState.beforeSelectedTravauxByFacture = beforeSelectedTravauxByFacture;

      return newState;

    case types.SET_SELECT_FACTURE_BY_SEARCH_NAME:
      newState.facturesBySearchName = payload.factures;
      return newState;

    default:
      return state;
  }
};

export default facture;
