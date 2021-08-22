import { csrfFetch } from "./csrf";

////// action types //////
const GET_BOOKINGS = 'bookings/getBookings';
const GET_A_BOOKING = 'bookings/getABooking'
const ADD_BOOKING = 'bookings/addBooking';
const EDIT_BOOKING = 'bookings/editBooking';
const REMOVE_BOOKING = 'bookings/removev';

////// action creators //////
export const getBookings = (bookings) => ({
  type: GET_BOOKINGS,
  bookings,
});

export const getABooking = (booking) => ({
  type: GET_A_BOOKING,
  booking,
});

export const addBooking = (newBooking) => ({
  type: ADD_BOOKING,
  newBooking,
});

export const editBooking = (editedBooking) => ({
  type: EDIT_BOOKING,
  editedBooking,
});

export const removeBooking = (deletedBooking) => ({
  type: REMOVE_BOOKING,
  deletedBooking,
});

////// thunk creators //////
export const fetchBookings = (homeId) => async (dispatch) => {
  const res = await fetch(`/api/homes/${homeId}/bookings`);
  if (res.ok) {
    const bookings = await res.json();
    dispatch(getBookings(bookings));
  }
};

export const fetchABooking = (homeId, bookingId) => async (dispatch) => {
  const res = await fetch(`/api/homes/${homeId}/bookings/${bookingId}`);
  if (res.ok) {
    const booking = await res.json();
    dispatch(getABooking(booking));
  }
};

export const postBooking = (payload) => async (dispatch) => {
  const res = await csrfFetch('/api/homes/:homeId/bookings/new', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  const newBooking = await res.json();

  if (res.ok) {
    dispatch(addBooking(newBooking));
  }
  return newBooking;
};

export const updateBooking = (booking, homeId) => async (dispatch) => {
  const res = await csrfFetch(`/api/homes/${homeId}/bookings/${booking.id}/edit`, {
    method: 'PUT',
    body: JSON.stringify(booking),
  });
  const editedBooking = await res.json();

  if (res.ok) {
    dispatch(editBooking(editedBooking));
  }
  return editedBooking;
};

export const deleteBooking = (bookingId, homeId) => async (dispatch) => {

  const res = await csrfFetch(`/api/homes/${homeId}/bookings/${bookingId}`, {
    method: 'DELETE',
  });
  const deletedBooking = await res.json();

  if (res.ok) {
    dispatch(removeBooking(deletedBooking));
  }
  return deletedBooking;
};

////// reducer //////

const initialState = {};

const bookingsReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_BOOKINGS:
      newState = {};
      action.bookings.forEach((booking) => {
        newState[booking.id] = booking;
      });
      return newState;
    case GET_A_BOOKING:
      return {
        ...state,
        [action.booking.id]: action.booking
      };
    case ADD_BOOKING:
      return {
        ...state,
        [action.newBooking.id]: action.newBooking,
      };
    case EDIT_BOOKING: {
      return {
        ...state,
        [action.editedBooking.id]: action.editedBooking,
      };
    }
    case REMOVE_BOOKING: {
      if (newState[action.deletedBooking]) delete newState[action.deletedBooking];
      return newState;
    }
    default:
      return state;
  }
}

export default bookingsReducer;
