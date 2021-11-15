import { combineReducers, createStore } from "redux";
import admsReducer from "./reducers/adm.reducer";
import doctorsReducer from "./reducers/doctor.reducer";
import nursesReducer from "./reducers/nurse.reducer";
import patientsReducer from "./reducers/patients.reducer";
import userReducer from "./reducers/user.reducer";

const reducers = combineReducers({
    user: userReducer,
    doctors: doctorsReducer,
    nurses: nursesReducer,
    adms: admsReducer,
    patients: patientsReducer,
});

function storeConfig() {
    return createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
}

export default storeConfig;
