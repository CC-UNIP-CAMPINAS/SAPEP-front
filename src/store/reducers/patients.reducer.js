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
            const patients = tempPatients.filter((patient) => patient.userId !== action.payload.id);
            return [...patients, action.payload];
        case types.ADD_MEDICAL_PRESCRIPTION:
            return {
                ...state,
                MedicalRecord: {
                    ...state.MedicalRecord,
                    MedicalPrescription: [...state.MedicalRecord.MedicalPrescription, action.payload],
                },
            };
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
