import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import "../home.css"

import { fetchHomes } from '../../store/homesReducer';

const HomeData = () => {
  const dispatch = useDispatch();

  useSelector(state => Object.values(state.homes))

  useEffect(() => {
    dispatch(fetchHomes());
  }, [dispatch]);

  const { id } = useParams();

  const homeData = useSelector((state) => state.homes[id]);

  return (
    <div className="homeDataDiv">
      <img className="eventDataPhoto" src={homeData?.photoUrl} alt="event" />
      <h2 className="eventDataAddress1">{homeData?.street}</h2>
      <p className="eventDataAddress2">{homeData?.city}, {homeData?.state} {homeData?.zipcode}</p>
      <p className="eventDataSize">{homeData?.sqft} square feet, {homeData?.beds} bedrooms, {homeData?.baths} bathrooms</p>
      <p className="eventDataYear">Built in {homeData?.yearBuilt}</p>
      <Link to={`/homes/${id}/edit`}>Edit Home</Link>
    </div>
  );
};

export default HomeData;
