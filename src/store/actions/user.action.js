import types from "../types";

export function setUser(user) {
  return {
    type: types.SET_USER,
    payload: user,
  };
}
