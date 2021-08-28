import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { userReducer } from "@/redux/user-reducer";
import { cartReducer } from "@/redux/cart-reducer";
import { editReducer } from "@/redux/edit-reducer";

const reducers = combineReducers({
  userPage: userReducer,
  cartPage: cartReducer,
  editPage: editReducer,
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;
