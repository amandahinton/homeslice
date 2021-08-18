import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "../home.css"

const HomeDetail = ({ id }) => {
  const homeData = useSelector((state) => state.homes[id]);
  return (
    <li>
      <div className="homeDataDiv">
        <img className="eventDataPhoto" src={homeData?.photoUrl} alt="event" />
        <NavLink className="eventDataAddress1" to={`/homes/${id}`}><h2>{homeData?.street}</h2></NavLink>
        <p className="eventDataAddress2">{homeData?.city}, {homeData?.state} {homeData?.zipcode}</p>
        <p className="eventDataSize">{homeData?.sqft} square feet, {homeData?.beds} bedrooms, {homeData?.baths} bathrooms</p>
        <p className="eventDataYear">Built in {homeData?.yearBuilt}</p>
      </div>
    </li>
  );
};

export default HomeDetail;
