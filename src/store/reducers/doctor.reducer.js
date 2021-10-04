import types from "../types";

const initialState = [];

export default function configsReducer(state = initialState, action) {
    switch (action.type) {
        case types.SET_DOCTORS:
            return action.payload;
        case types.CLEAR:
            return {
                ...initialState,
            };
        default:
            return state;
    }
}
