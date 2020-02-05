import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import ReduxPromise from "redux-promise";

import rootReducer from "./reducers/rootReducer";

const myStore = initialState =>
  createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(ReduxPromise))
  );

export default myStore;
