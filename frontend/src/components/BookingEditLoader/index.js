import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchABooking } from '../../store/bookingsReducer';
import { useParams } from "react-router-dom";
import BookingEditForm from '../BookingEdit/BookingEditForm';

const BookingLoader = ( {bookingId}) => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const booking = useSelector(state => state.bookings[bookingId])

  useEffect(() => {
    dispatch(fetchABooking(id, bookingId));
  }, [dispatch, id, bookingId]);

  if (booking) {
    return (
      <BookingEditForm originalBooking={booking} />
    );
  } else {
    return null
  }
};

export default BookingLoader;
