import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "../../context/Modal.css";
import { updateBooking } from "../../store/bookingsReducer";
import "../booking.css";

const HomeEditForm = ({ originalBooking }) => {
  const dispatch = useDispatch();

  let oldDate = originalBooking.date
  let newDate = oldDate.slice(0,10);

  const [date, setDate] = useState(newDate);
  const [title, setTitle] = useState(originalBooking.title);
  const [description, setDescription] = useState(originalBooking.description);
  const [intervalDays, setIntervalDays] = useState(originalBooking.intervalDays);
  const [errors, setErrors] = useState([]);

  const reset = () => {
    setDate("");
    setTitle("");
    setDescription("");
    setIntervalDays("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const editedBooking = {
      id: originalBooking.id,
      date,
      title,
      description,
      intervalDays,
      homeId: originalBooking.homeId,
      eventId: originalBooking.eventId
    };

    await dispatch(updateBooking(editedBooking, originalBooking.homeId));       // returns editedBooking from bookingReducer thunk
    reset();
    window.location = `/bookings/${originalBooking.id}`;
  };

  useEffect(() => {
    const validationErrors = [];
    if (!date) validationErrors.push("Select a valid date for task to be completed by");
    if (title.length < 1 || title.length > 255) validationErrors.push("Title must be between 1 and 255 characters long");
    setErrors(validationErrors);
  }, [date, title])

  return (
    <div className="editBookingFormDiv">
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
          <button
            className="formButton"
            type="submit"
            disabled={errors.length > 0}
          >
            Update task
          </button>
        </form>
      </div>
    </div>
  );
};

export default HomeEditForm;




  // return (
  //   <div className="editHomeFormDiv">
  //     <div className="formTitleDiv">
  //       <h1 className="formTitle">Edit home details</h1>
  //     </div>
  //     <div className="formErrorsDiv">
  //       <ul className="formErrorsList">
  //         {errors && errors.map(error => <li className="formErrorsItem" key={error}>{error}</li>)}
  //       </ul>
  //     </div>
  //     <div className="formFieldsDiv">
  //       <form className="editHomeForm" onSubmit={handleSubmit}>
  //         <label className="formLabel" htmlFor='street'>
  //           Street
  //           <input
  //             className="formInput"
  //             value={street}
  //             onChange={(event) => setStreet(event.target.value)}
  //             id='street'
  //             type="text"
  //             name="street"
  //           />
  //         </label>
  //         <label className="formLabel" htmlFor='city'>
  //           City
  //           <input
  //             className="formInput"
  //             value={city}
  //             onChange={(event) => setCity(event.target.value)}
  //             id='city'
  //             type="text"
  //             name="city"
  //           />
  //         </label>
  //         <label className="formLabel" htmlFor='state'>
  //           State
  //           <input
  //             className="formInput"
  //             value={state}
  //             onChange={(event) => setState(event.target.value)}
  //             id='state'
  //             type="text"
  //             name="state"
  //           />
  //         </label>
  //         <label className="formLabel" htmlFor='zipcode'>
  //           Zipcode
  //           <input
  //             className="formInput"
  //             value={zipcode}
  //             onChange={(event) => setZipcode(event.target.value)}
  //             id='zipcode'
  //             type="text"
  //             name="zipcode"
  //           />
  //         </label>
  //         <label className="formLabel" htmlFor='photoUrl'>
  //           Link to photo
  //           <input
  //             className="formInput"
  //             value={photoUrl}
  //             onChange={(event) => setPhotoUrl(event.target.value)}
  //             id='photoUrl'
  //             type="text"
  //             name="photoUrl"
  //           />
  //         </label>
  //         <label className="formLabel" htmlFor='sqft'>
  //           Square Footage
  //           <input
  //             className="formInput"
  //             value={sqft}
  //             onChange={(event) => setSqft(event.target.value)}
  //             id="sqft"
  //             type="number"
  //             name="sqft"
  //             min="0"
  //           />
  //         </label>
  //         <label className="formLabel" htmlFor='beds'>
  //           Number of beds
  //           <input
  //             className="formInput"
  //             value={beds}
  //             onChange={(event) => setBeds(event.target.value)}
  //             id="beds"
  //             type="number"
  //             name="beds"
  //             min="0"
  //           />
  //         </label>
  //         <label className="formLabel" htmlFor='baths'>
  //           Number of baths
  //           <input
  //             className="formInput"
  //             value={baths}
  //             onChange={(event) => setBaths(event.target.value)}
  //             id="baths"
  //             type="number"
  //             name="baths"
  //             min="0"
  //           />
  //         </label>
  //         <label className="formLabel" htmlFor='yearBuilt'>
  //           Year built
  //           <input
  //             className="formInput"
  //             value={yearBuilt}
  //             onChange={(event) => setYearBuilt(event.target.value)}
  //             id="yearBuilt"
  //             type="number"
  //             name="yearBuilt"
  //             min="0"
  //           />
  //         </label>
  //         <button
  //           className="formButton"
  //           type="submit"
  //           disabled={errors.length > 0}
  //         >
  //           Update your home
  //         </button>
  //       </form>
  //     </div>
  //   </div>
  // );
