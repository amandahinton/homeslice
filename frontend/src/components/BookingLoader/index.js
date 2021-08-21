import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHomes } from '../../store/homesReducer';
import { fetchEvents } from '../../store/eventsReducer';
import BookingAddForm from '../BookingAdd/BookingAddForm';

const BookingLoader = () => {
  const dispatch = useDispatch();

  const homes = useSelector(state => state.homes)

  const events = useSelector(state => state.events)

  useEffect(() => {
    dispatch(fetchHomes());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  if (homes && events) {
    return (
      <BookingAddForm homes={homes} events={events} />
    );
  } else {
    return null
  }
};

export default BookingLoader;
