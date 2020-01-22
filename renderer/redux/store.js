import { createStore } from "redux";

import rootReducer from "./reducers/rootReducer";

const store = initialState => createStore(rootReducer, initialState);

export default store;
