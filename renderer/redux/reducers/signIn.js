const SIMULATION = {
  signIns: [
    {
      id: "admin",
      passWd: "admin"
    }
  ]
};

const initState = {
  signIns: [...SIMULATION.signIns]
};

const signIn = (state = initState, action) => {
  let newState = { ...state };
  let payload = action.payload;

  switch (action.type) {
    default:
      return state;
  }
};

export default signIn;
