import * as types from "../constants/pvActionTypes";

const SIMULATION = {
  pvs: [
    {
      numPv: "00001",
      circonscription: "Sambava",
      commune: "aaaaa",
      district: "Samabva",
      region: "SAVA"
    },
    {
      numPv: "00002",
      circonscription: "Antalaha",
      commune: "aaaaa",
      district: "Antalaha",
      region: "SAVA"
    }
  ]
};

const initState = {
  pvs: [...SIMULATION.pvs]
};

const pv = (state = initState, action) => {
  let newState = { ...state };
  let payload = action.payload;

  switch (action.type) {
    case types.ADD_PV:
      newState.pvs = [...state.pvs, payload.pv];
      return newState;

    default:
      return state;
  }
};

export default pv;
