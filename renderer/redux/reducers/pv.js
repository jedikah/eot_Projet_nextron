import * as types from "../constants/pvActionTypes";

const initState = {
  pvs: []
};

const pv = (state = initState, action) => {
  let newState = { ...state };
  let payload = action.payload;
  let { pvs } = state;

  switch (action.type) {
    case types.INIT_PV:
      newState.pvs = payload.pvs;
      return newState;

    case types.ADD_PV:
      const indexPV = pvs.findIndex(item => {
        return item.NumPV === payload.pv.NumPV;
      });
      pvs[indexPV] = { ...payload.pv };
      newState.pvs = [...pvs];
      return newState;

    default:
      return state;
  }
};

export default pv;
