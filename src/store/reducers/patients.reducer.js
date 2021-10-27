import types from "../types";

const initialState = [];

export default function configsReducer(state = initialState, action) {
    switch (action.type) {
        case types.SET_PATIENTS:
            return action.payload;
        case types.ADD_PATIENT:
            return [...state, action.payload];
        case types.UPDATE_PATIENT:
            const tempPatients = [...state];
            const patients = tempPatients.filter((patient) => patient.id !== action.payload.id);
            return [...patients, action.payload];
        case types.ADD_MEDICAL_PRESCRIPTION:
            console.log(action.payload);
            const patientsTemp = state.filter((patient) => patient.id !== action.payload.patientId);
            const patient = state.find((patient) => patient.id === +action.payload.patientId);

            patient.MedicalRecord = {
                ...patient.MedicalRecord,
                MedicalPrescription: [...patient.MedicalRecord.MedicalPrescription, action.payload.data],
            };

            return [...patientsTemp, patient];
        case types.ADD_TEAM_REPORT:
            return {
                ...state,
                MedicalRecord: {
                    ...state.MedicalRecord,
                    TeamReport: [...state.MedicalRecord.TeamReport, action.payload],
                },
            };
        case types.CLEAR:
            return initialState;
        default:
            return state;
    }
}
