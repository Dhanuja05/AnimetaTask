import { combineReducers } from "redux";
import taskReducer from "./taskReducer";
import filterReducer from "./filterReducer";

const reducers = combineReducers({
  tasks: taskReducer,
  filter: filterReducer,
});

export default reducers;
