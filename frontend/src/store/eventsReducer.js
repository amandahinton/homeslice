const GET_EVENTS = 'events/getEvents';
// const GET_CATS = 'events/getCats';
// const GET_EVENTS_CATS = 'events/getEventsCats';

////// action creators //////
export const getEvents = (events) => ({
  type: GET_EVENTS,
  events,
});

// export const getCats = (categories) => ({
//   type: GET_CATS,
//   categories,
// });

// export const getEventsCats = (eventsCats) => ({
//   type: GET_EVENTS_CATS,
//   eventsCats,
// });

////// thunk creators //////
export const fetchEvents = () => async (dispatch) => {
  const res = await fetch('/api/events');
  if (res.ok) {
    const events = await res.json();
    dispatch(getEvents(events));
  }
};

// export const fetchCats = () => async (dispatch) => {
//   const res = await fetch('/api/cats');
//   if (res.ok) {
//     const categories = await res.json();
//     dispatch(getCats(categories));
//   }
// };

// export const fetchEventsCats = () => async (dispatch) => {
//   const res = await fetch('/api/events/eventsCats');
//   if (res.ok) {
//     const eventsCats = await res.json();
//     dispatch(getEventsCats(eventsCats));
//   }
// };

const initialState = { };

const eventsReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_EVENTS:
      action.events.forEach((event) => {
        newState[event.id] = event;
      });
      return newState;
    // case GET_CATS:
    //   action.categories.forEach((category) => {
    //     newState[category.id] = category;
    //   });
    //   return newState;
    // case GET_EVENTS_CATS:
    //   action.eventsCats.forEach((eventCat) => {
    //     newState[eventCat.id] = eventCat;
    //   });
    //   return newState;
    default:
      return state;
  }
}

export default eventsReducer;
