import types from "../types";

const initialState = [];

export default function configsReducer(state = initialState, action) {
    switch (action.type) {
        case types.SET_ADM:
            return action.payload;
        case types.ADD_ADM:
            return [...state, action.payload];
        case types.UPDATE_ADM:
            const tempAdms = [...state];
            const adms = tempAdms.filter((adm) => adm.userId !== action.payload.userId);
            return [...adms, action.payload];
        case types.CLEAR:
            return initialState;
        default:
            return state;
    }
}
