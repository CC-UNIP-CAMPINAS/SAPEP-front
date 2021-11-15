import types from "../types";

export function setNurses(nurses) {
    return {
        type: types.SET_NURSES,
        payload: nurses,
    };
}

export function addNurse(nurse) {
    return {
        type: types.ADD_NURSE,
        payload: nurse,
    };
}

export function updateNurse(nurse) {
    return {
        type: types.UPDATE_NURSE,
        payload: nurse,
    };
}
