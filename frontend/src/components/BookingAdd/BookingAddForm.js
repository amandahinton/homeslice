import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { postBooking } from "../../store/bookingsReducer";
import "../booking.css";
import "../../context/Modal.css";

const BookingAddForm = ({homes, events}) => {

  const { id } = useParams();

  const [date, setDate] = useState("");
  const [title, setTitle] = useState(events[id].title);
  const [description, setDescription] = useState(events[id].description);
  const [intervalDays, setIntervalDays] = useState(events[id].intervalDays);
  const [homeId, setHomeId] = useState("");
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();

  const reset = () => {
    setDate("");
    setTitle("");
    setDescription("");
    setIntervalDays("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBooking = {
      date,
      title,
      description,
      intervalDays,
      homeId,
      eventId:id
    };

    await dispatch(postBooking(newBooking));       // returns newBooking from bookingReducer thunk
    reset();
    window.location.reload();
  };

  useEffect(() => {
    const validationErrors = [];
    if (!date) validationErrors.push("Select a valid date for task to be completed by");
    if (title.length < 1 || title.length > 255) validationErrors.push("Title must be between 1 and 255 characters long");
    setErrors(validationErrors);
  }, [date, title])

  return (
    <div className="newBookingFormDiv">
      <div className="formTitleDiv">
        <h1 className="formTitle">Add task to home</h1>
      </div>
      <div className="formErrorsDiv">
        <ul className="formErrorsList">
          {errors && errors.map(error => <li className="formErrorsItem" key={error}>{error}</li>)}
        </ul>
      </div>
      <div className="formFieldsDiv">
        <form className="newBookingForm" onSubmit={handleSubmit}>
          <label className="formLabel" htmlFor='date'>
            Due date
            <input
              className="formInput"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              id='date'
              type="date"
              name="date"
            />
          </label>
          <label className="formLabel" htmlFor='title'>
            Title
            <input
              className="formInput"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              id='title'
              type="text"
              name="title"
            />
          </label>
          <label className="formLabel" htmlFor='description'>
            Description
            <textarea
              className="formInput"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              id='description'
              rows='3'
              cols='50'
              name="intervalDays"
            />
          </label>
          <label className="formLabel" htmlFor='intervalDays'>
            Repeat in # days
            <input
              className="formInput"
              value={intervalDays}
              onChange={(event) => setIntervalDays(event.target.value)}
              id='intervalDays'
              type='text'
              name='intervalDays'
            />
          </label>
          <label className="formLabel">
          Select home
            <select
              className="formInput"
              value={homeId}
              onChange={(event) => setHomeId(event.target.value)}
            >
              {Object.values(homes).map(home => (
                <option
                  key={home.id}
                  value={home.id}
                >
                  {home.street}
                </option>
              ))}
            </select>
          </label>
          <button
            className="formButton"
            type="submit"
            disabled={errors.length > 0}
          >
            Add to home
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingAddForm;
