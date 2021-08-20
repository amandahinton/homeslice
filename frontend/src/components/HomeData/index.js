import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import HomeEditFormModal from "../HomeEdit"
import { fetchHomes, deleteHome } from '../../store/homesReducer';

import "../home.css"

const HomeData = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  useSelector(state => Object.values(state.homes))

  useEffect(() => {
    dispatch(fetchHomes());
  }, [dispatch]);

  const { id } = useParams();

  const homeData = useSelector((state) => state.homes[id]);

  const destroyHome = (e) => {
    e.preventDefault();
    dispatch(deleteHome(id));
    history.push("/homes")
  };

  return (
  <div className="homeList">
    <div className="homeDataContainer">
      <div className="homeDataDiv">
        <img className="homeDataPhoto" src={homeData?.photoUrl} alt="event" />
        <h2 className="homeDataAddress1">{homeData?.street}</h2>
        <p className="homeDataAddress2">{homeData?.city}, {homeData?.state} {homeData?.zipcode}</p>
        <p className="homeDataSize">{homeData?.sqft} square feet</p>
        <p className="homeDataSize">{homeData?.beds} bedrooms, {homeData?.baths} bathrooms</p>
        <p className="homeDataYear">Built in {homeData?.yearBuilt}</p>
      </div>
    </div>
    <div className="homeDataContainer">
      <div className="homeDataContainer2">
        <div className="homeDataDiv2">
          <h2 className="homeDataTitle">Next task</h2>
        </div>
        <ul className="homeDataDiv3">
          <li className="homeDataBooking">MVP2 pending</li>
        </ul>
        <div className="homeDataDiv4">
          <div className="homeChangeButtonsDiv">
            <button className="secondaryButton" onClick={destroyHome}>Delete home</button>
            <HomeEditFormModal />
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default HomeData;
