import { createSelector } from "reselect";

const getTravau = state => state.travau;
const getClient = state => state.client;
const getLettreCharge = state => state.lettreCharge;
const getConvocation = state => state.convocation;
const getPv = state => state.pv;

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

export const getConvocationClient = createSelector(
  [getTravau, getConvocation],
  (travauReducer, convocationReducer) => {
    let selectedTravau = travauReducer.selectedTravau;

    if (selectedTravau !== null)
      return convocationReducer.convocations.filter(
        convocation => convocation.IdTrav === selectedTravau.IdTrav
      );
    else return null;
  }
);

export const getPvTravau = createSelector(
  [getTravau, getPv],
  (travauReducer, pvReducer) => {
    const nullPv = {
      PieceJust: "",
      Commune: "",
      District: "",
      Region: "",
      NumPV: ""
    };
    let selectedTravau = travauReducer.selectedTravau;
    if (selectedTravau !== null)
      return pvReducer.pvs.filter(pv => pv.NumPV === selectedTravau.IdTrav)[0];
    else return nullPv;
  }
);
