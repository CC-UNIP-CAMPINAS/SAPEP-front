import types from "../types";

const initialState = [];

export default function configsReducer(state = initialState, action) {
    switch (action.type) {
        case types.SET_DOCTORS:
            return action.payload;
        case types.ADD_DOCTOR:
            return [...state, action.payload];
        case types.UPDATE_DOCTOR:
            const tempDoctors = [...state];
            const docs = tempDoctors.filter((doctor) => doctor.userId !== action.payload.userId);

            return [...docs, action.payload];
        case types.CLEAR:
            return {
                ...initialState,
            };
        default:
            return state;
    }
}
