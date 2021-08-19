import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { postHome } from "../../store/homesReducer";
import "../home.css"
import "../../context/Modal.css"

const HomeAddForm = () => {
  const sessionUser = useSelector(state => state.session.user);

  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [userId, setUserId] = useState(sessionUser.id);
  const [photoUrl, setPhotoUrl] = useState("");
  const [sqft, setSqft] = useState(0);
  const [beds, setBeds] = useState(0);
  const [baths, setBaths] = useState(0);
  const [yearBuilt, setYearBuilt] = useState(0);
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();

  const reset = () => {
    setStreet("");
    setCity("");
    setState("");
    setZipcode("");
    setUserId("");
    setPhotoUrl("");
    setSqft(0);
    setBeds(0);
    setBaths(0);
    setYearBuilt(1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newHome = {
      street,
      city,
      state,
      zipcode,
      userId,
      photoUrl,
      sqft,
      beds,
      baths,
      yearBuilt
    };

    // const newHomeFromDb = await dispatch(postHome(newHome));
    await dispatch(postHome(newHome));       // returns newHome from homeReducer thunk
    reset();
    window.location = "/homes";
  };

  useEffect(() => {
    const validationErrors = [];
    if (street.length < 1 || street.length > 100) validationErrors.push("Street address must be between 1 and 100 characters long");
    if (city.length < 1 || city.length > 100) validationErrors.push("City must be between 1 and 100 characters long");
    if (state.length !== 2) validationErrors.push("State must be two-letter state code");
    if (zipcode.length < 5 || zipcode.length > 10) validationErrors.push("Zipcode must be between 5 and 10 characters long");
    if (photoUrl.length < 1 || photoUrl.length > 255) validationErrors.push("Link to image must be a valid URL less than 255 characters long");
    setErrors(validationErrors);
  }, [street, city, state, zipcode, userId, photoUrl])

  return (
    <div className="newHomeFormDiv">
      <div className="formTitleDiv">
        <h1 className="formTitle">Add home to profile</h1>
      </div>
      <div className="formErrorsDiv">
        <ul className="formErrorsList">
          {errors && errors.map(error => <li className="formErrorsItem" key={error}>{error}</li>)}
        </ul>
      </div>
      <div className="formFieldsDiv">
        <form className="newHomeForm" onSubmit={handleSubmit}>
          <label className="formLabel" htmlFor='street'>
            Street
            <input
              className="formInput"
              value={street}
              onChange={(event) => setStreet(event.target.value)}
              id='street'
              type="text"
              name="street"
            />
          </label>
          <label className="formLabel" htmlFor='city'>
            City
            <input
              className="formInput"
              value={city}
              onChange={(event) => setCity(event.target.value)}
              id='city'
              type="text"
              name="city"
            />
          </label>
          <label className="formLabel" htmlFor='state'>
            State
            <input
              className="formInput"
              value={state}
              onChange={(event) => setState(event.target.value)}
              id='state'
              type="text"
              name="state"
            />
          </label>
          <label className="formLabel" htmlFor='zipcode'>
            Zipcode
            <input
              className="formInput"
              value={zipcode}
              onChange={(event) => setZipcode(event.target.value)}
              id='zipcode'
              type="text"
              name="zipcode"
            />
          </label>
          <label className="formLabel" htmlFor='photoUrl'>
            Link to photo
            <input
              className="formInput"
              value={photoUrl}
              onChange={(event) => setPhotoUrl(event.target.value)}
              id='photoUrl'
              type="text"
              name="photoUrl"
            />
          </label>
          <label className="formLabel" htmlFor='sqft'>
            Square Footage
            <input
              className="formInput"
              value={sqft}
              onChange={(event) => setSqft(event.target.value)}
              id="sqft"
              type="number"
              name="sqft"
              min="0"
            />
          </label>
          <label className="formLabel" htmlFor='beds'>
            Number of beds
            <input
              className="formInput"
              value={beds}
              onChange={(event) => setBeds(event.target.value)}
              id="beds"
              type="number"
              name="beds"
              min="0"
            />
          </label>
          <label className="formLabel" htmlFor='baths'>
            Number of baths
            <input
              className="formInput"
              value={baths}
              onChange={(event) => setBaths(event.target.value)}
              id="baths"
              type="number"
              name="baths"
              min="0"
            />
          </label>
          <label className="formLabel" htmlFor='yearBuilt'>
            Year built
            <input
              className="formInput"
              value={yearBuilt}
              onChange={(event) => setYearBuilt(event.target.value)}
              id="yearBuilt"
              type="number"
              name="yearBuilt"
              min="0"
            />
          </label>
          <button
            className="formButton"
            type="submit"
            disabled={errors.length > 0}
          >
            Add your home
          </button>
        </form>
      </div>
    </div>
  );
};

export default HomeAddForm;
