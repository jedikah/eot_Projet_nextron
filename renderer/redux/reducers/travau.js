import * as types from "../constants/travauActionTypes";

const initState = {
  travaux: [],
  selectedTravau: null,
  CountTravaux: 0,
  travauxBySearchName: [],
  lastPageChange: 1
};

const travau = (state = initState, action) => {
  let newState = { ...state };
  let payload = action.payload;
  let { travaux } = state;

  switch (action.type) {
    case types.INIT_TRAVAU:
      newState.travaux = payload.travaux;
      newState.CountTravaux = payload.CountTravaux;
      newState.lastPageChange = payload.lastPageChange

      return newState;

    case types.ADD_TRAVAU:
      travaux.unshift(payload.newTrav);
      newState.travaux = [...travaux];
      return newState;

    case types.SET_SELECTED_TRAVAU:
      newState.selectedTravau = payload.selectedTravau;
      return newState;

    case types.UPDATE_TRAVAU:
      const indexTrav = travaux.findIndex(
        item => item.IdTrav === payload.updateTrav.IdTrav
      );
      travaux[indexTrav] = payload.updateTrav;
      newState.travaux = [...travaux];
      return newState;

    case types.UPDATE_TRAVAU_FACT:
      let index_Trav = -2;
      if(travaux.findIndex(
        item => item.IdTrav === payload.IdTrav
      ) !== -1) {

        index_Trav = travaux.findIndex(
        item => item.IdTrav === payload.IdTrav);

        travaux[index_Trav].IdFact = payload.IdFact;
        newState.travaux = [...travaux];
        return newState;
      }
      

    case types.SET_SELECT_TRAVAU_BY_SEARCH_NAME:
      newState.travauxBySearchName = payload.travaux;
      return newState;

    default:
      return state;
  }
};

export default travau;
