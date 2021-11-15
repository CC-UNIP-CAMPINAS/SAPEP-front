import types from "../types";

export function setAdms(adms) {
    return {
        type: types.SET_ADM,
        payload: adms,
    };
}

export function addAdm(adm) {
    return {
        type: types.ADD_ADM,
        payload: adm,
    };
}

export function updateAdm(adm) {
    return {
        type: types.UPDATE_ADM,
        payload: adm,
    };
}
