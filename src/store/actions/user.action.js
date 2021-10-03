import types from "../types";

export function setUser(user) {
    return {
        type: types.SET_USER,
        payload: user,
    };
}

export function setAuth(auth) {
    return {
        type: types.SET_AUTH,
        payload: auth,
    };
}
