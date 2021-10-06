import types from "../types";

export function setDoctors(doctors) {
    return {
        type: types.SET_DOCTORS,
        payload: doctors,
    };
}

export function addDoctor(doctor) {
    return {
        type: types.ADD_DOCTOR,
        payload: doctor,
    };
}

export function updateDoctor(doctor) {
    return {
        type: types.UPDATE_DOCTOR,
        payload: doctor,
    };
}
