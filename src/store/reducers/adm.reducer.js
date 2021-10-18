import types from "../types";

const initialState = [
    {
        active: true,
        userId: 41,
        user: {
            updatedAt: "2021-10-14T20:06:00.000Z",
            email: "julia_clg@hotmail.com",
            gender: "F",
            groupId: 2,
            name: "Júlia Colnaghi Petta",
            phone: "(19) 98851-5590",
        },
    },
];

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
