import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "../home.css"

const HomeDetail = ({ id }) => {
  const homeData = useSelector((state) => state.homes[id]);
  return (
    <li className="homeListItem">

      <div className="homeDataDiv">
        <NavLink to={`/homes/${id}`}><img className="homeDataPhoto" src={homeData?.photoUrl} alt="home" /></NavLink>
        <NavLink to={`/homes/${id}`}><h2 className="homeDataAddress1">{homeData?.street}</h2></NavLink>
        <p className="homeDataAddress2">{homeData?.city}, {homeData?.state} {homeData?.zipcode}</p>
        <p className="homeDataSize">{homeData?.sqft} square feet</p>
        <p className="homeDataSize">{homeData?.beds} bedrooms, {homeData?.baths} bathrooms</p>
        <p className="homeDataYear">Built in {homeData?.yearBuilt}</p>
      </div>
    </li>
  );
};

export default HomeDetail;
