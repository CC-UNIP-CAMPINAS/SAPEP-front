import { createStore, combineReducers } from "redux";
import devToolsEnhancer from "remote-redux-devtools";
import userReducer from "./reducers/user.reducer";

const reducers = combineReducers({
  user: userReducer,
});

function storeConfig() {
  return createStore(reducers, devToolsEnhancer());
}

export default storeConfig;
