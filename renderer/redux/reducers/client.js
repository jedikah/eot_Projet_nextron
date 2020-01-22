const SIMULATION = {
  clients: [
    {
      id: "2",
      nomCli: "Gabriel Kwan",
      domicile: "Sambava centre",
      contact: "032xxxxx"
    }
  ]
};

const initialState = {
  clients: [...SIMULATION.clients]
};

const client = (state = initialState, action) => {
  let newState = { ...state };
  let payload = action.payload;

  switch (action.type) {
    default:
      return state;
  }
};

export default client;
