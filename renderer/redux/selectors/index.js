import { createSelector } from "reselect";

const getTravau = state => state.travau;
const getClient = state => state.client;
const getLettreCharge = state => state.lettreCharge;

export const getTravauClient = createSelector(
  [getTravau, getClient],
  (travauReducer, clientReducer) => {
    let selectedTravau = travauReducer.selectedTravau;
    return clientReducer.clients.filter(
      client => client.IdCli === selectedTravau.IdCli
    )[0];
  }
);

export const getTravauLettreCharge = createSelector(
  [getTravau, getLettreCharge],
  (travauReducer, lettreChargeReducer) => {
    let selectedTravau = travauReducer.selectedTravau;
    return lettreChargeReducer.lettreCharges.filter(
      lc => lc.IdTrav === selectedTravau.IdTrav
    );
  }
);
