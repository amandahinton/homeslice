import { useSelector } from 'react-redux';
import BookingEditFormModal from "../BookingEdit"
import "../booking.css"

const BookingDetail= ({id}) => {
  const bookingData = useSelector((state) => state.bookings[id]);

  return (
    <li className="booking-list-item">
      <div className="booking-list-item-div">
        <h2 className="booking-list-title">{bookingData?.title}</h2>
        <h4 className="booking-list-date">Complete this on {bookingData?.date}</h4>
        <p className="booking-list-description">{bookingData?.description}</p>
        <p className="booking-list-interval">Complete this task every {bookingData?.intervalDays} days</p>
        <BookingEditFormModal bookingId={bookingData.id}/>
      </div>
    </li>
  );
};

export default BookingDetail;
