import types from "../types";

const initialState = [
    {
        id: 1,
        name: "Leonardo", //ok
        lastName: "Petta do Nascimento", //ok
        cep: "130330-10", //ok
        addressNumber: "695", //ok
        address: "Avenida Brigadeiro Rafael Tobias de Aguiar, Jardim Aurélia, Campinas - SP",
        complement: "Casa", //ok
        phone: "(19) 99383-2547", //ok
        birthday: "2000-10-09T00:00:00.000Z", //ok
        cpf: "473.382.048-88", //ok
        rg: "39.329.130-3", //ok
        healthInsurance: "AMIL", //ok
        gender: "M", //ok
    },
];

export default function configsReducer(state = initialState, action) {
    switch (action.type) {
        case types.SET_PATIENTS:
            return action.payload;
        case types.ADD_PATIENT:
            return [...state, action.payload];
        case types.UPDATE_PATIENT:
            const tempPatients = [...state];
            const patients = tempPatients.filter((patient) => patient.userId !== action.payload.id);
            return [...patients, action.payload];
        case types.CLEAR:
            return initialState;
        default:
            return state;
    }
}
