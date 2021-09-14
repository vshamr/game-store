import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { userReducer } from "./user-reducer";
import { cartReducer } from "./cart-reducer";
import { editReducer } from "./edit-reducer";

const reducers = combineReducers({
  userPage: userReducer,
  cartPage: cartReducer,
  editPage: editReducer,
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export type ReducersType = ReturnType<typeof reducers>;

export default store;
