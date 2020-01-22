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

  switch (action.type) {
    default:
      return state;
  }
};

export default facture;
