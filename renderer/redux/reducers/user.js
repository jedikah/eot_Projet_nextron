import * as DB from "../../models/index";

let path = DB.homeDir("ECM");
path += "EMC.sqlite";
const db = DB.connect(path);

const initState = {
  users: DB.selectUsers(db).users
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
