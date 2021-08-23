import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import BookingEditFormModal from "../BookingEdit";
import { fetchBookings, deleteBooking } from '../../store/bookingsReducer';
import { fetchEvents } from '../../store/eventsReducer';
import "../booking.css"

const BookingsNext = () => {
  const dispatch = useDispatch();

  const bookings = useSelector(state => Object.values(state.bookings))

  const events = useSelector(state => state.events)

  const sortedBookings = bookings.sort((a, b) => {
    if (a.date < b.date) {
      return -1;
    } else if (a.date === b.date) {
      return 0;
    } else {
      return 1;
    }
  })
  const bookingData = sortedBookings[0]

  const { id: homeId } = useParams();

  useEffect(() => {
    dispatch(fetchBookings(homeId));      // dispatch return value of thunk creator
  }, [dispatch, homeId]);

  useEffect(() => {
    dispatch(fetchEvents());      // dispatch return value of thunk creator
  }, [dispatch, homeId]);

  const destroyBooking = (e) => {
    e.preventDefault();
    const confirmReply = window.confirm("Sure you want to delete this task?")
    if (confirmReply === true) {
      dispatch(deleteBooking(bookingData?.id, homeId));
    }
    window.location.reload();
  };

  const bookingEvent = bookingData?.eventId // 5

  if (bookings.length > 0) {
    return (
      <div className="booking-next-container">
        <div className="booking-next-div-content">
          <h2 className="booking-next-card-header">Next Task</h2>
          <img className="booking-next-photo" src={events[bookingEvent]?.imageUrl} alt="event" />
          <h2 className="booking-next-title">{bookingData?.title}</h2>
          <h4 className="booking-next-date">Complete this by {bookingData?.date}</h4>
          <p className="booking-next-description">{bookingData?.description}</p>
          <p className="booking-next-interval">Complete this task every {bookingData?.intervalDays} days</p>

          <div className="booking-next-div-buttons">
            <div className="bookingChangeButtonsDiv">
              <button className="secondaryButton" onClick={destroyBooking}>Remove task</button>
              <BookingEditFormModal bookingId={bookingData?.id} />
            </div>
          </div>
        </div>
      </div >
    );
  } else {
    return null
  }
};

export default BookingsNext;
