const SIMULATION = {
  travaux: [
    {
      idTrav: "00001",
      numTitre: "pr0005",
      nomTer: "villa kwan",
      localisationTrav: "sambava",
      fokontany: "aaaaaa",
      dateTrav: "jj-mm-aaaa",
      typeTrav: "bornage",
      prix: "350000"
    },
    {
      idTrav: "00001",
      numTitre: "pr0005",
      nomTer: "villa kwan",
      localisationTrav: "sambava",
      fokontany: "aaaaaa",
      dateTrav: "jj-mm-aaaa",
      typeTrav: "bornage",
      prix: "350000"
    }
  ]
};

const initState = {
  travaux: [...SIMULATION.travaux]
};

const travau = (state = initState, action) => {
  let newState = { ...state };
  let payload = action.payload;

  switch (action.type) {
    default:
      return state;
  }
};

export default travau;
