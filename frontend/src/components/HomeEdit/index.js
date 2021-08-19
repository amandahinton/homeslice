import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory} from "react-router-dom";
import { updateHome } from "../../store/homesReducer";
import "../home.css"

const HomeEdit = ({originalHome}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [street, setStreet] = useState(originalHome.street);
  const [city, setCity] = useState(originalHome.city);
  const [state, setState] = useState(originalHome.state);
  const [zipcode, setZipcode] = useState(originalHome.zipcode);
  const [photoUrl, setPhotoUrl] = useState(originalHome.photoUrl);
  const [sqft, setSqft] = useState(originalHome.sqft);
  const [beds, setBeds] = useState(originalHome.beds);
  const [baths, setBaths] = useState(originalHome.baths);
  const [yearBuilt, setYearBuilt] = useState(originalHome.yearBuilt);
  const [errors, setErrors] = useState([]);

  const reset = () => {
    setStreet("");
    setCity("");
    setState("");
    setZipcode("");
    setPhotoUrl("");
    setSqft(0);
    setBeds(0);
    setBaths(0);
    setYearBuilt(1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const editedHome = {
      id: originalHome.id,
      street,
      city,
      state,
      zipcode,
      userId: originalHome.userId,
      photoUrl,
      sqft,
      beds,
      baths,
      yearBuilt
    };

    await dispatch(updateHome(editedHome));       // returns editedHome from homeReducer thunk
    reset();
    history.push(`/homes/${originalHome.id}`)
  };

  useEffect(() => {
    const validationErrors = [];
    if (street.length < 1 || street.length > 100) validationErrors.push("Street address must be between 1 and 100 characters long");
    if (city.length < 1 || city.length > 100) validationErrors.push("City must be between 1 and 100 characters long");
    if (state.length !== 2) validationErrors.push("State must be two-letter state code");
    if (zipcode.length < 5 || zipcode.length > 10) validationErrors.push("Zipcode must be between 5 and 10 characters long");
    if (photoUrl.length < 1 || photoUrl.length > 255) validationErrors.push("Link to image must be a valid URL less than 255 characters long");
    setErrors(validationErrors);
  }, [street, city, state, zipcode, photoUrl])

  return (
    <div className="editHomeFormDiv">
      <div className="formTitleDiv">
        <h1 className="formTitle">Update home details</h1>
      </div>
      <div className="formErrorsDiv">
        <ul className="formErrorsList">
          {errors && errors.map(error => <li className="formErrorsItem" key={error}>{error}</li>)}
        </ul>
      </div>
      <div className="formFieldsDiv">
        <form className="editHomeForm" onSubmit={handleSubmit}>
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
            Number of bedrooms
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
            Number of bathrooms
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
            Year home was built
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
            Update your home
          </button>
        </form>
      </div>
    </div>
  );
};

export default HomeEdit;
