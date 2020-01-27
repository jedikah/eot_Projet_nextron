import * as types from "../constants/lettreChargeActionTypes";

const SIMULATION = {
  letreCharges: [
    {
      numRTX: "a000001",
      dateRTX: "jj-mm-aaaa",
      villeL: "sambava",
      dateL: "jj-mm-aaaa",
      objet: "demande de bornage"
    },
    {
      numRTX: "a000002",
      dateRTX: "jj-mm-aaaa",
      villeL: "sambava",
      dateL: "jj-mm-aaaa",
      objet: "demande de bornage"
    }
  ]
};

const initState = {
  lettreCharges: [...SIMULATION.letreCharges]
};

const lettreCharge = (state = initState, action) => {
  let newState = { ...state };
  let payload = action.payload;
  let { lettreCharges } = state;

  switch (action.type) {
    case types.ADD_LETTRE_CHARGE:
      lettreCharges.push(payload.newLettreCharge);
      newState.lettreCharges = [...lettreCharges];
      return newState;

    default:
      return state;
  }
};

export default lettreCharge;
