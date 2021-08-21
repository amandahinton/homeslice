import { useSelector } from 'react-redux';
import BookingEditFormModal from "../BookingEdit"
import "../booking.css"

const BookingDetail= ({id}) => {
  const bookingData = useSelector((state) => state.bookings[id]);

  let originalDate = new Date(bookingData?.date);
  let newDate = (originalDate.getMonth() + 1) + '/' + originalDate.getDate() + '/' + originalDate.getFullYear();

  return (
    <li className="booking-list-item">
      <div className="booking-list-item-div">
        <h2 className="booking-list-title">{bookingData?.title}</h2>
        <h4 className="booking-list-date">Complete this on {newDate}</h4>
        <p className="booking-list-description">{bookingData?.description}</p>
        <p className="booking-list-interval">Complete this task every {bookingData?.intervalDays} days</p>
        <BookingEditFormModal />
      </div>
    </li>
  );
};

export default BookingDetail;
