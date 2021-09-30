import types from "../types";

const initialState = {
    email: "",
    groupId: null,
    id: "",
    createdAt: "",
    auth: false,
};

export default function configsReducer(state = initialState, action) {
    switch (action.type) {
        case types.SET_USER:
            return {
                ...state,
                ...action.payload,
            };
        case types.SET_AUTH:
            return {
                ...state,
                auth: action.payload,
            };
        default:
            return state;
    }
}
