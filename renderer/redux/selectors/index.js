import { createSelector } from "reselect";

const getTravau = state => state.travau;
const getClient = state => state.client;
const getLettreCharge = state => state.lettreCharge;

export const getTravauClient = createSelector(
  [getTravau, getClient],
  (travauReducer, clientReducer) => {
    let selectedTravau = travauReducer.selectedTravau;

    if (selectedTravau !== null)
      return clientReducer.clients.filter(
        client => client.IdCli === selectedTravau.IdCli
      )[0];
    else return null;
  }
);

export const getTravauLettreCharge = createSelector(
  [getTravau, getLettreCharge],
  (travauReducer, lettreChargeReducer) => {
    let selectedTravau = travauReducer.selectedTravau;
    if (selectedTravau !== null)
      return lettreChargeReducer.lettreCharges.filter(
        lc => lc.IdTrav === selectedTravau.IdTrav
      );
    else return null;
  }
);
