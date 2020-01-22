import { createStore } from "redux";

import rootReducer from "./reducers/rootReducer";

const myStore = initialState => createStore(rootReducer, initialState);

export default myStore;
