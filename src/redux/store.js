import { createStore } from "redux";
import reducers from "../redux/reducer/index";

const store = createStore(reducers);

export default store;
