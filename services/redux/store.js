import { createStore, combineReducers } from "redux";

import cartReducer from "./reducers/cart";

const reducers = combineReducers({
  cart: cartReducer,
});

export default createStore(reducers);
