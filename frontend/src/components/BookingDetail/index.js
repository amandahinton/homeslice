import { useDispatch, useSelector } from 'react-redux';
import BookingEditFormModal from "../BookingEdit";
import { deleteBooking } from '../../store/bookingsReducer';
import "../booking.css"

const BookingDetail = ({bookingId, homeId}) => {     // id is home id
  const dispatch = useDispatch();

  const destroyBooking = (e) => {
    e.preventDefault();
    dispatch(deleteBooking(bookingId, homeId));
    window.location.reload();
  };

  const bookingData = useSelector((state) => state.bookings[bookingId]);

  return (
    <li className="booking-list-item">
      <div className="booking-list-item-div">
        <h2 className="booking-list-title">{bookingData?.title}</h2>
        <h4 className="booking-list-date">Complete this on {bookingData?.date}</h4>
        <p className="booking-list-description">{bookingData?.description}</p>
        <p className="booking-list-interval">Complete this task every {bookingData?.intervalDays} days</p>
        <button className="secondaryButton" onClick={destroyBooking}>Remove task</button>
        <BookingEditFormModal bookingId={bookingData.id}/>
      </div>
    </li>
  );
};

export default BookingDetail;
