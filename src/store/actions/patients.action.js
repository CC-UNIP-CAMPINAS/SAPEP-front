import types from "../types";

export function setPatients(patients) {
    return {
        type: types.SET_PATIENTS,
        payload: patients,
    };
}

export function addPatient(patient) {
    return {
        type: types.ADD_PATIENT,
        payload: patient,
    };
}

export function updatePatient(patient) {
    return {
        type: types.UPDATE_PATIENT,
        payload: patient,
    };
}
