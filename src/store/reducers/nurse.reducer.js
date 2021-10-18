import types from "../types";

const initialState = [];

export default function configsReducer(state = initialState, action) {
    switch (action.type) {
        case types.SET_NURSES:
            return action.payload;
        case types.ADD_NURSE:
            return [...state, action.payload];
        case types.UPDATE_NURSE:
            const tempNurses = [...state];
            const docs = tempNurses.filter((nurse) => nurse.userId !== action.payload.userId);
            return [...docs, action.payload];
        case types.CLEAR:
            return initialState;
        default:
            return state;
    }
}
