import * as types from "../constants/clientActionTypes";
import * as DB from "../../models/index";

let path = DB.homeDir("ECM");
path += "EMC.sqlite";
const db = DB.connect(path);

const initialState = {
  clients: DB.selectClients(db).clients
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
