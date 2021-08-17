// const GET_BOOKINGS = 'booking/getBookings';

// export const getBookings = (bookings) => ({     // action creator
//   type: GET_BOOKINGS,
//   bookings,
// });

// export const fetchBookings = () => async (dispatch) => {      // thunk creator for GET request
//   const res = await fetch('/api/bookings');
//   if (res.ok) {
//     const bookings = await res.json();
//     dispatch(getBookings(bookings));
//   }
// };

// const initialState = {
//   bookings: []
// };

// const sortBookings = (bookings) => {
//   return bookings.sort((bookingA, bookingB) => {
//     return bookingA.date - bookingB.date;
//   }).map((booking) => booking.id);
// };

// const bookingsReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case GET_BOOKINGS: {
//       const allBookings = {};  // new state
//       action.list.forEach(booking => {
//         allBookings[booking.id] = booking;
//       });
//       return {
//         ...allBookings,
//         ...state,
//         list: sortBookings(action.list),
//       };
//     }
//     default:
//       return state;
//   }
// }

// export default bookingsReducer;
