import * as types from "../constants/menuActionTypes";

export const ROUTE_MENU = {
  NEWDOC: "NEWDOC",
  ELABORATION: "ELABORATION",
  PLANING: "PLANING"
};

const initialState = {
  routeMenu: ROUTE_MENU.NEWDOC
};

const menu = (state = initialState, action) => {
  const newState = { ...state };
  const payload = action.payload;

  switch (action.type) {
    case types.CHANGE_ROUTE_MENU:
      newState.routeMenu = payload.routeMenu;
      return newState;

    default:
      return state;
  }
};

export default menu;
