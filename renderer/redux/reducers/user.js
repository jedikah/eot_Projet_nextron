import * as types from "../constants/userActionTypes";

const initState = {
  users: [
    {
      id: 1,
      idpers: 1,
      name: "admin",
      passWd: "admin"
    }
  ]
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
