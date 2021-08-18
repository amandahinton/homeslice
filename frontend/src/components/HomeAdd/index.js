import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { postHome } from "../../store/homesReducer";
import "../home.css"

const HomeAdd = () => {
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
  const history = useHistory();

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
    setYearBuilt(0);
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

    const newHomeFromDb = await dispatch(postHome(newHome));       // returns newHome from homeReducer thunk
    // console.log(newHomeFromDb);
    reset();
    history.push("/")
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
      <ul className="formErrors">
        {errors && errors.map(error => <li key={error}>{error}</li>)}
      </ul>
      <h1 className="formTitle">Add new home</h1>
      <form className="newHomeForm" onSubmit={handleSubmit}>
        <label htmlFor='street'>
          Street
          <input
            value={street}
            onChange={(event) => setStreet(event.target.value)}
            id='street'
            type="text"
            name="street"
          />
        </label>
        <label htmlFor='city'>
          City
          <input
            value={city}
            onChange={(event) => setCity(event.target.value)}
            id='city'
            type="text"
            name="city"
          />
        </label>
        <label htmlFor='state'>
          State
          <input
            value={state}
            onChange={(event) => setState(event.target.value)}
            id='state'
            type="text"
            name="state"
          />
        </label>
        <label htmlFor='zipcode'>
          Zipcode
          <input
            value={zipcode}
            onChange={(event) => setZipcode(event.target.value)}
            id='zipcode'
            type="text"
            name="zipcode"
          />
        </label>
        <label htmlFor='photoUrl'>
          Link to photo
          <input
            value={photoUrl}
            onChange={(event) => setPhotoUrl(event.target.value)}
            id='photoUrl'
            type="text"
            name="photoUrl"
          />
        </label>
        <label htmlFor='sqft'>
          Square Footage
          <input
            value={sqft}
            onChange={(event) => setSqft(event.target.value)}
            id="sqft"
            type="number"
            name="sqft"
            min="0"
          />
        </label>
        <label htmlFor='beds'>
          Number of bedrooms
          <input
            value={beds}
            onChange={(event) => setBeds(event.target.value)}
            id="beds"
            type="number"
            name="beds"
            min="0"
          />
        </label>
        <label htmlFor='baths'>
          Number of bathrooms
          <input
            value={baths}
            onChange={(event) => setBaths(event.target.value)}
            id="baths"
            type="number"
            name="baths"
            min="0"
          />
        </label>
        <label htmlFor='yearBuilt'>
          Year home was built
          <input
            value={yearBuilt}
            onChange={(event) => setYearBuilt(event.target.value)}
            id="yearBuilt"
            type="number"
            name="yearBuilt"
            min="0"

          />
        </label>
        <button
          type="submit"
          disabled={errors.length > 0}
        >
          Add your home
        </button>
      </form>
    </div>
  );
};

export default HomeAdd;
