import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import "../home.css"

const HomeData = () => {
  const { id } = useParams();

  const homeData = useSelector((state) => state.homes[id]);

  return (
    <div className="homeDataDiv">
      <h1 className="eventDataAddress1">{homeData?.street}</h1>
      <p className="eventDataAddress2">{homeData?.city}, {homeData?.state} {homeData?.zipcode}</p>
      <img className="eventDataPhoto"src={homeData?.photoUrl} alt="event" />
      <p className="eventDataSize">{homeData?.sqft} square feet, {homeData?.beds} bedrooms, {homeData?.baths} bathrooms</p>
      <p className="eventDataYear">Built in {homeData?.yearBuilt}</p>
    </div>
  );
};

export default HomeData;
