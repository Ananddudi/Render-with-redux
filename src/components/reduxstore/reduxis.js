import { combineReducers } from "redux";
import { reducer, adminReducer } from "./reducerfile.js";

const reducers = combineReducers({
  reducer,
  adminReducer,
});

export default reducers;
