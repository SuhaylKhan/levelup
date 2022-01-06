import { csrfFetch } from "./csrf";

const SET = "session/SET";
const REMOVE = "session/REMOVE";

export const setSession = (user) => {
  return {
    type: SET,
    ...user,
  };
};

export const removeSession = () => {
  return {
    type: REMOVE,
  };
};

export const login = (payload) => async (dispatch) => {
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const user = await response.json();
    dispatch(setSession(user));
  }
};

const sessionReducer = (state = { user: null }, action) => {
  switch (action.type) {
    case SET: {
      console.log('USER', action.user.id)
      const newState = {
        ...state,
        user: {
          id: action.user.id,
          email: action.user.email,
          username: action.user.username,
          createdAt: action.user.createdAt,
          updatedAt: action.user.updatedAt,
        },
      };
      return newState;
    }
    case REMOVE: {
      const newState = {
        ...state,
        user: null,
      };
      return newState;
    }
    default:
      return state;
  }
};

export default sessionReducer;
