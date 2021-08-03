import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from 'redux-thunk'
import { reducer } from "@/redux/reducer";


let store = createStore(reducer, applyMiddleware(thunkMiddleware));

export default store;
