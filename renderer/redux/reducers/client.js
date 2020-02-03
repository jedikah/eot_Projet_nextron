import * as types from "../constants/clientActionTypes";
import * as DB from "../../models/index";

const initialState = {
  clients: []
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
