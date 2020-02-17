import * as types from "../constants/userActionTypes";

const initState = {
  users: []
};

const user = (state = initState, action) => {
  let newState = { ...state };
  let payload = action.payload;

  switch (action.type) {
    case types.INIT_USER:
      newState.users = payload.users;
      return newState;
    default:
      return state;
  }
};

export default user;
