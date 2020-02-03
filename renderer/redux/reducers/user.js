import * as DB from "../../models/index";

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
    default:
      return state;
  }
};

export default user;
