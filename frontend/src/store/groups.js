import { csrfFetch } from './csrf';

const SET_GROUPS = 'groups/setGroups';

const setGroups = (groups) => {
  return {
    type: SET_GROUPS,
    payload: groups
  };
};

export const getGroups = () => async (dispatch) => {
  const response = await csrfFetch('/api/groups');

  const data = await response.json();
  dispatch(setGroups(data.groups));
  return response;
};

const groupsReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_GROUPS: {
      let newState = action.payload.reduce((a, b) => {
        return {
          ...a,
          [b.id]: b
        }
      }, {})
      return newState;
    }
    default:
      return state;
  }
};

export default groupsReducer;
