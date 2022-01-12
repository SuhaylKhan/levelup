import { csrfFetch } from "./csrf";

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";
const SET_USER_GROUPS = "groups/setUserGroups";

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

const setUserGroups = (groups) => {
  return {
    type: SET_USER_GROUPS,
    payload: groups
  };
};

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch("/api/session");
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const signup = (user) => async (dispatch) => {
  const { fullName, username, email, password } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      fullName,
      username,
      email,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const logout = () => async dispatch => {
  const response = await csrfFetch('/api/session', {
    method: "DELETE"
  })
  dispatch(removeUser());
  return response;
};

export const getUserGroups = (userId) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/${userId}/groups`);
  const data = await response.json();
  const adminGroups = data.adminGroups;
  const memberGroups = data.memberGroups.Groups;
  const userGroups = adminGroups.concat(memberGroups)
  dispatch(setUserGroups(userGroups));
  return response;
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    case SET_USER_GROUPS: {
      newState = Object.assign({}, state);
      newState.groups = action.payload.reduce((a, b) => {
        return {
          ...a,
          [b.id]: b
        }
      }, {});
      return newState;
    }
    default:
      return state;
  }
};

export default sessionReducer;
