import { csrfFetch } from "./csrf";

const SET_EVENTS = 'events/setEvents';

const setEvents = (events) => {
  return {
    type: SET_EVENTS,
    payload: events
  };
};

export const getEvents = () => async (dispatch) => {
  const response = await csrfFetch('/api/events');

  const data = await response.json();
  dispatch(setEvents(data.events));
  return response;
};

const eventsReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_EVENTS: {
      const newState = action.payload.reduce((a, b) => {
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

export default eventsReducer;
