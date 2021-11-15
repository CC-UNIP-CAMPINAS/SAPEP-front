import types from "../types";
import _ from "lodash";
import update from "immutability-helper";

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
        case types.ADD_NURSE_PRESCRIPTION:
            const patientsCopy = state.filter((patient) => patient.id !== +action.payload.patientId);
            const patientCopy = state.find((patient) => patient.id === +action.payload.patientId);

            patientCopy.MedicalRecord = {
                ...patientCopy.MedicalRecord,
                NursePrescription: [...patientCopy.MedicalRecord.NursePrescription, action.payload.data],
            };

            return _.sortBy([...patientsCopy, patientCopy], ["id"]);
        case types.ADD_TEAM_REPORT:
            const stateCopy = state.filter((patient) => patient.id !== +action.payload.patientId);
            const foundPatient = state.find((patient) => patient.id === +action.payload.patientId);

            foundPatient.MedicalRecord = {
                ...foundPatient.MedicalRecord,
                TeamReport: [...foundPatient.MedicalRecord.TeamReport, action.payload.data],
            };

            return _.sortBy([...stateCopy, foundPatient], ["id"]);
        case types.ADD_NURSE_REPORT:
            const copyState = state.filter((patient) => patient.id !== +action.payload.patientId);
            const patientFonded = state.find((patient) => patient.id === +action.payload.patientId);

            patientFonded.MedicalRecord = {
                ...patientFonded.MedicalRecord,
                NurseReport: [...patientFonded.MedicalRecord.NurseReport, action.payload.data],
            };

            return _.sortBy([...copyState, patientFonded], ["id"]);

        case types.SET_REALIZED_NURSE_PRESCRIPTION:
            const indexPatient = state.findIndex((patient) => patient.id === +action.payload.patientId);
            const indexPrescription = state[indexPatient].MedicalRecord.NursePrescription.findIndex(
                (prescription) => prescription.id === action.payload.data.id
            );
            return indexPrescription !== -1
                ? update(state, {
                      [indexPatient]: {
                          MedicalRecord: {
                              NursePrescription: { [indexPrescription]: { $merge: { ...action.payload.data } } },
                          },
                      },
                  })
                : state;
        case types.SET_REALIZED_MEDICAL_PRESCRIPTION:
            const patientIndex = state.findIndex((patient) => patient.id === +action.payload.patientId);
            const prescriptionIndex = state[patientIndex].MedicalRecord.MedicalPrescription.findIndex(
                (prescription) => prescription.id === action.payload.data.id
            );
            return prescriptionIndex !== -1
                ? update(state, {
                      [patientIndex]: {
                          MedicalRecord: {
                              MedicalPrescription: { [prescriptionIndex]: { $merge: { ...action.payload.data } } },
                          },
                      },
                  })
                : state;
        case types.CLEAR:
            return initialState;
        default:
            return state;
    }
}
