import { createStore, combineReducers } from "redux";
import userReducer from "./reducers/user.reducer";
import groupsReducer from "./reducers/groups.reducer";
import doctorsReducer from "./reducers/doctor.reducer";
import nursesReducer from "./reducers/nurse.reducer";
import admsReducer from "./reducers/adm.reducer";
import patientsReducer from "./reducers/patients.reducer";

const reducers = combineReducers({
    user: userReducer,
    groups: groupsReducer,
    doctors: doctorsReducer,
    nurses: nursesReducer,
    adms: admsReducer,
    patients: patientsReducer,
});

function storeConfig() {
    return createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
}

export default storeConfig;
