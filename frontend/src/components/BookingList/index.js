import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import BookingDetail from '../BookingDetail';
import { fetchBookings } from '../../store/bookingsReducer';
import "../booking.css"

const BookingsList = () => {
  const dispatch = useDispatch();

  const bookings = useSelector(state => Object.values(state.bookings))

  const sortedBookings = bookings.sort((a, b) => {
    if (a.date < b.date) {
      return -1;
    } else if (a.date === b.date) {
      return 0;
    } else {
      return 1;
    }
  })


  const { id : homeId} = useParams();

  useEffect(() => {
    dispatch(fetchBookings(homeId));      // dispatch return value of thunk creator
  }, [dispatch, homeId]);

  if (bookings.length > 0) {
    return (
      <div className="booking-list-container">
        <>
          {bookings && (
            <div className="booking-list-container">
              <h1 className="booking-list-title">Tasks for this home</h1>
              <ul className="booking-list">
                {sortedBookings && sortedBookings?.map(({ id }) => {
                  return <BookingDetail key={id} homeId={homeId} bookingId={id} />;
                })}
              </ul>
            </div>
          )}
        </>
      </div>
    );
  } else {
    return null
  }

};

export default BookingsList;
