import { createStore ,applyMiddleware } from "redux";
import authReducer from "./reducers/authReducer";
import { combineReducers } from "redux";
import thunk from 'redux-thunk'

const store = createStore(authReducer, applyMiddleware(thunk))

export default store;