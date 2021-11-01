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

export function addMedicalPrescription(prescription) {
    return {
        type: types.ADD_MEDICAL_PRESCRIPTION,
        payload: prescription,
    };
}

export function addNursePrescription(prescription) {
    return {
        type: types.ADD_NURSE_PRESCRIPTION,
        payload: prescription,
    };
}

export function addTeamReport(report) {
    return {
        type: types.ADD_TEAM_REPORT,
        payload: report,
    };
}

export function addNurseReport(report) {
    return {
        type: types.ADD_NURSE_REPORT,
        payload: report,
    };
}

export function setRealizedNursePrescription(prescription) {
    return {
        type: types.SET_REALIZED_NURSE_PRESCRIPTION,
        payload: prescription,
    };
}
export function setRealizedMedicalPrescription(prescription) {
    return {
        type: types.SET_REALIZED_MEDICAL_PRESCRIPTION,
        payload: prescription,
    };
}
