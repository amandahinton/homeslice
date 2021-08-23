# Homeslice

Homeslice is an app for homeowners to manage maintenance and repair (M+R) activities for their home/s. Users can subscribe to suggested routine M+R events or create their own custom tasks. Now homeowners can stay on top of the recurring needs of the property—-from roof inspection to gutter cleaning to appliance upkeep—-extending and protecting the value and safety of their home.

Homeslice can be found at: https://homesliceapp.herokuapp.com/

## Development
* You can read more about the project using the wiki located at: https://github.com/amandahinton/homeslice
* To start a development environment:
  1. Clone the repository at: https://github.com/amandahinton/homeslice
  2. Run the command "npm install" inside both the frontend and backend directories to install dependencies
  3. Run the command "npm start" from both the frontend and backend directories to launch the servers

## Technologies Used
* Javascript
* Express
* React
* Redux
* Thunk
* Node.js
* HTML
* CSS
* Postgres
* Sequelize
* Heroku
* Git + Github

##  Features
See full feature list, user stories, and more at: https://github.com/amandahinton/homeslice/wiki
* Users
  * User signup, login/logout authentication, demo, and authorization to perform operations throughout the site
  * Bcrypt password hashing and protection from csurf attacks
* Homes
  * One user has one or more homes, which is the recipient of one or more bookings
* Events (possible tasks)
  * A list of suggested events can be browsed by the user
  * An event may have one or more categories
* Bookings (tasks)
  * Users can view, add, edit, or delete bookings for their home
  * Users can also create a custom booking from an event template

## Database Structure
![](https://github.com/amandahinton/homeslice/blob/main/design/database/database_schema.png)

## Style Guide
![](https://github.com/amandahinton/homeslice/blob/main/design/homeslice_brand_style.png)

## Challenges and Learnings
* LearningRedux and Thunk on the fly, as needed to implement
* Limited time constraints: build an app in one week
* Waiting until all of the required data has been returned before using it
* Managing state
* Using Heroku for Postgres database

## Code Highlights

* Component for next task on /homes/:id
      ``` js
      const BookingsNext = () => {
        const dispatch = useDispatch();

        const bookings = useSelector(state => Object.values(state.bookings))

        const events = useSelector(state => state.events)

        const sortedBookings = bookings.sort((a, b) => {
          if (a.date < b.date) {
            return -1;
          } else if (a.date === b.date) {
            return 0;
          } else {
            return 1;
          }
        })
        const bookingData = sortedBookings[0]

        const { id: homeId } = useParams();

        useEffect(() => {
          dispatch(fetchBookings(homeId));      // dispatch return value of thunk creator
        }, [dispatch, homeId]);

        useEffect(() => {
          dispatch(fetchEvents());      // dispatch return value of thunk creator
        }, [dispatch, homeId]);

        const destroyBooking = (e) => {
          e.preventDefault();
          window.confirm("Sure you want to delete this task?")
          dispatch(deleteBooking(bookingData?.id, homeId));
          window.location.reload();
        };

        const bookingEvent = bookingData?.eventId // 5

        if (bookings.length > 0) {
          return (
            <div className="booking-next-container">
              <div className="booking-next-div-content">
                <h2 className="booking-next-card-header">Next Task</h2>
                <img className="booking-next-photo" src={events[bookingEvent]?.imageUrl} alt="event" />
                <h2 className="booking-next-title">{bookingData?.title}</h2>
                <h4 className="booking-next-date">Complete this by {bookingData?.date}</h4>
                <p className="booking-next-description">{bookingData?.description}</p>
                <p className="booking-next-interval">Complete this task every {bookingData?.intervalDays} days</p>
                <div className="booking-next-div-buttons">
                  <div className="bookingChangeButtonsDiv">
                    <button className="secondaryButton" onClick={destroyBooking}>Remove task</button>
                    <BookingEditFormModal bookingId={bookingData?.id} />
                  </div>
                </div>
              </div>
            </div >
          );
        } else {
          return null
        }
      };
      ```

* Component for new home form on /homes
      ``` js
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

          const newHome = { street, city, state, zipcode, userId, photoUrl, sqft, beds, baths, yearBuilt };

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
      ```

## Created by [Amanda Hinton](https://github.com/amandahinton)
