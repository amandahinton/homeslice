const GET_EVENTS = 'events/getEvents';

export const getEvents = (events) => ({     // action creator
  type: GET_EVENTS,
  events,
});

export const fetchEvents = () => async (dispatch) => {      // thunk creator for GET request
  const res = await fetch('/api/events');
  if (res.ok) {
    const events = await res.json();
    dispatch(getEvents(events));
  }
};

const initialState = { };

const eventsReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_EVENTS:
      action.events.forEach((event) => {
        newState[event.id] = event;
      });
      return newState;
    default:
      return state;
  }
}

export default eventsReducer;
