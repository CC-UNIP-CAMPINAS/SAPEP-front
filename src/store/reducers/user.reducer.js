import types from "../types";

const initialState = {
  email: "",
  auth: false,
};

export default function configsReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_USER:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
