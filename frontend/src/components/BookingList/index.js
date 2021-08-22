import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import BookingDetail from '../BookingDetail';
import { fetchBookings } from '../../store/bookingsReducer';
import "../booking.css"

const BookingsList = () => {
  const dispatch = useDispatch();

  const bookings = useSelector(state => Object.values(state.bookings))

  const { id : homeId} = useParams();

  useEffect(() => {
    dispatch(fetchBookings(homeId));      // dispatch return value of thunk creator
  }, [dispatch, homeId]);

  return (
    <>
      {bookings && (
        <div>
          <h1>Tasks for this home</h1>
          <ul className="homeList">
            {bookings && bookings?.map(({ id }) => {
              return <BookingDetail key={id} homeId={homeId} bookingId={id} />;
            })}
          </ul>
        </div>
      )}
    </>
  );
};

export default BookingsList;
