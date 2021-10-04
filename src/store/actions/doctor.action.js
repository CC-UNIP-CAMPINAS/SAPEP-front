import types from "../types";

export function setDoctors(doctors) {
    return {
        type: types.SET_DOCTORS,
        payload: doctors,
    };
}
