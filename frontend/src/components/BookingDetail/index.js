import { useDispatch, useSelector } from 'react-redux';
import BookingEditFormModal from "../BookingEdit";
import { deleteBooking } from '../../store/bookingsReducer';
import "../booking.css"

const BookingDetail = ({bookingId, homeId}) => {
  const dispatch = useDispatch();

  const destroyBooking = (e) => {
    e.preventDefault();
    const confirmReply = window.confirm("Sure you want to delete this task?")
    if (confirmReply === true) {
      dispatch(deleteBooking(bookingId, homeId));
    }
    window.location.reload();
  };

  const bookingData = useSelector((state) => state.bookings[bookingId]);

  return (
    <li className="booking-list-item">
      <div className="booking-list-item-div">

        <div className="booking-list-item-text">
          <h2 className="booking-list-title">{bookingData?.title}</h2>
          <h4 className="booking-list-date">Complete this by {bookingData?.date}</h4>
          <p className="booking-list-description">{bookingData?.description}</p>
          <p className="booking-list-interval">Complete this task every {bookingData?.intervalDays} days</p>
        </div>

        <div className="bookingChangeButtonsDiv">
          <button className="secondaryButton" onClick={destroyBooking}>Remove task</button>
          <BookingEditFormModal bookingId={bookingData.id}/>
        </div>

      </div>
    </li>
  );
};

export default BookingDetail;
