import types from "../types";

export function setGroups(groups) {
    return {
        type: types.SET_GROUPS,
        payload: groups,
    };
}
