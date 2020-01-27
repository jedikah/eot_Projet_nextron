import * as types from "../constants/factureActionTypes";

const SIMULATION = {
  factures: [
    {
      idFact: "00001",
      dateFact: "jj-mm-aaaa"
    },
    {
      idFact: "00002",
      dateFact: "jj-mm-aaaa"
    }
  ]
};

const initState = {
  factures: [...SIMULATION.factures]
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

    default:
      return state;
  }
};

export default facture;
