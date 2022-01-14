import { csrfFetch } from "./csrf";
import * as groupActions from "./groups";

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

export const createEvent = (event) => async (dispatch) => {
  const {
    hostId,
    groupId,
    name,
    description,
    date,
    capacity,
    inPerson
  } = event;
  const response = await csrfFetch('/api/events', {
    method: 'POST',
    body: JSON.stringify({
      hostId,
      groupId,
      name,
      description,
      date,
      capacity,
      inPerson
    })
  });
  dispatch(getEvents());
  return response;
};

export const editEvent = (event) => async (dispatch) => {
  const {
    eventId,
    name,
    description,
    date,
    capacity,
    inPerson
  } = event;
  const response = await csrfFetch(
    `/api/events/${eventId}`,
    {
      method: 'PUT',
      body: JSON.stringify({
        name,
        description,
        date,
        capacity,
        inPerson
      })
    }
  );
  dispatch(getEvents());
  dispatch(groupActions.getGroups());
  return response;
};

export const deleteEvent = (eventId) => async (dispatch) => {
  const response = await csrfFetch(
    `/api/events/${eventId}`,
    {
      method: 'DELETE'
    }
  )
  dispatch(getEvents());
  dispatch(groupActions.getGroups());
  return response;
}

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
