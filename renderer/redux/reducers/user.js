import * as types from "../constants/userActionTypes";

const initState = {
  users: []
};

const user = (state = initState, action) => {
  let newState = { ...state };
  let payload = action.payload;
  let { users } = state;

  switch (action.type) {
    case types.INIT_USER:
      newState.users = payload.users;
      return newState;

    case types.UPDATE_USER:
      const indexUser = users.findIndex(item => item.IdUser === payload.IdUser);
      users[indexUser].PassWord = payload.PassWord;
      users[indexUser].Nom = payload.Nom;
      newState.users = [...users];
      return newState;

    default:
      return state;
  }
};

export default user;
