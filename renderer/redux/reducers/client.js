import * as types from "../constants/clientActionTypes";

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
  let { clients } = state;

  switch (action.type) {
    case types.ADD_CLIENT:
      clients.push(payload.newClient);
      newState.clients = [...clients];
      return newState;

    default:
      return state;
  }
};

export default client;
