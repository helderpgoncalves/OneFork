import { createStore } from "redux"

import cartReducer from "./reducers/cart"

export default createStore(cartReducer)