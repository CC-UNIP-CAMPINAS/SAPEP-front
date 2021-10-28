import types from "../types";
import _ from "lodash";

const initialState = [];

export default function configsReducer(state = initialState, action) {
    switch (action.type) {
        case types.SET_PATIENTS:
            return action.payload;
        case types.ADD_PATIENT:
            return _.sortBy([...state, action.payload], ["id"]);
        case types.UPDATE_PATIENT:
            const tempPatients = [...state];
            const patients = tempPatients.filter((patient) => patient.id !== +action.payload.id);
            return _.sortBy([...patients, action.payload], ["id"]);
        case types.ADD_MEDICAL_PRESCRIPTION:
            const patientsTemp = state.filter((patient) => patient.id !== +action.payload.patientId);
            const patient = state.find((patient) => patient.id === +action.payload.patientId);

            patient.MedicalRecord = {
                ...patient.MedicalRecord,
                MedicalPrescription: [...patient.MedicalRecord.MedicalPrescription, action.payload.data],
            };

            return _.sortBy([...patientsTemp, patient], ["id"]);
        case types.ADD_TEAM_REPORT:
            const stateCopy = state.filter((patient) => patient.id !== +action.payload.patientId);
            const foundPatient = state.find((patient) => patient.id === +action.payload.patientId);

            foundPatient.MedicalRecord = {
                ...foundPatient.MedicalRecord,
                TeamReport: [...foundPatient.MedicalRecord.TeamReport, action.payload.data],
            };

            return _.sortBy([...stateCopy, foundPatient], ["id"]);
        case types.CLEAR:
            return initialState;
        default:
            return state;
    }
}
