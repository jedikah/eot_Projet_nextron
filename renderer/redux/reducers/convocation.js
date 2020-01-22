const SIMULATION = {
  convocations: [
    {
      numRegistre: "000001",
      nomPersConv: "Michael kwan",
      dateConv: "jj-mm-aaaa",
      villeConv: "nom ville",
      heureConv: "hh:mm",
      numReq: "req0003"
    },
    {
      numRegistre: "000002",
      nomPersConv: "Gabriel kwan",
      dateConv: "jj-mm-aaaa",
      villeConv: "nom ville",
      heureConv: "hh:mm",
      numReq: "req0004"
    }
  ]
};

const initstate = {
  convocations: [...SIMULATION.convocations]
};

const convocation = (state = initstate, action) => {
  let newState = { ...state };
  let payload = action.payload;
  switch (action.type) {
    default:
      return state;
  }
};

export default convocation;
