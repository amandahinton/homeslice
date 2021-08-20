import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "../home.css"

const HomeDetail = ({ id }) => {
  const homeData = useSelector((state) => state.homes[id]);
  return (
    <li className="homeListItem">
      <NavLink className="homeDataDiv" to={`/homes/${id}`}>
        <img className="homeDataPhoto" src={homeData?.photoUrl} alt="home" />
        <h2 className="homeDataAddress1">{homeData?.street}</h2>
        <p className="homeDataAddress2">{homeData?.city}, {homeData?.state} {homeData?.zipcode}</p>
        <p className="homeDataSize">{homeData?.sqft} square feet</p>
        <p className="homeDataSize">{homeData?.beds} bedrooms, {homeData?.baths} bathrooms</p>
        <p className="homeDataYear">Built in {homeData?.yearBuilt}</p>
      </NavLink>
    </li>
  );
};

export default HomeDetail;
