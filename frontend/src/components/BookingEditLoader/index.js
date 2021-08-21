import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookings } from '../../store/bookingsReducer';
import { useParams } from "react-router-dom";
import BookingEditForm from '../BookingEdit/BookingEditForm';

const BookingLoader = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const booking = useSelector(state => state.bookings[id])

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  if (booking) {
    return (
      <BookingEditForm originalBooking={booking} />
    );
  } else {
    return null
  }
};

export default BookingLoader;
