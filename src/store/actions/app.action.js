import types from "../types";

export function clearStore() {
    return {
        type: types.CLEAR,
        payload: {},
    };
}
