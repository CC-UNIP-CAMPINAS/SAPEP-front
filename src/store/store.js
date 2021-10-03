import { createStore, combineReducers } from "redux";
import userReducer from "./reducers/user.reducer";
import groupsReducer from "./reducers/groups.reducer";
const reducers = combineReducers({
    user: userReducer,
    groups: groupsReducer,
});

function storeConfig() {
    return createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
}

export default storeConfig;
