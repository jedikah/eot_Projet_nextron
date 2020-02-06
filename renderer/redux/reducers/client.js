import * as types from "../constants/clientActionTypes";

const initialState = {
  clients: []
};

const client = (state = initialState, action) => {
  let newState = { ...state };
  let payload = action.payload;
  let { clients } = state;

  switch (action.type) {
    case types.INIT_CLIENT:
      newState.clients = payload.clients;
      return newState;

    case types.ADD_CLIENT:
      clients.push(payload.copieNewClient);
      newState.clients = [...clients];
      return newState;

    case types.UPDATE_CLIENT:
      const indexCli = clients.findIndex(
        item => item.IdCli === payload.updateClient.IdCli
      );
      clients[indexCli] = payload.updateClient;
      newState.clients = [...clients];
      return newState;

    default:
      return state;
  }
};

export default client;
