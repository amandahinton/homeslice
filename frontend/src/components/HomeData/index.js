import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import HomeEditFormModal from "../HomeEdit"
import { fetchHomes, deleteHome } from '../../store/homesReducer';
import BookingList from '../BookingList';
import BookingNext from '../BookingNext';
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

    const confirmReply = window.confirm("BEWARE! This is strong medicine. Are you sure you want to permanently delete this home and all of its tasks?")
    if (confirmReply === true) {
      dispatch(deleteHome(id));
    }
    history.push("/homes")
  };

  return (
  <div className="homeList">

    <div className="homeDataContainer">
      <div className="homeDataDiv">
        <h2 className="home-data-card-header">Your Home</h2>
        <img className="homeDataPhoto" src={homeData?.photoUrl} alt="event" />
        <h2 className="homeDataAddress1">{homeData?.street}</h2>
        <p className="homeDataAddress2">{homeData?.city}, {homeData?.state} {homeData?.zipcode}</p>
        <p className="homeDataSize">{homeData?.sqft} square feet</p>
        <p className="homeDataSize">{homeData?.beds} bedrooms, {homeData?.baths} bathrooms</p>
        <p className="homeDataYear">Built in {homeData?.yearBuilt}</p>
        <div className="homeChangeButtonsDiv">
          <button className="secondaryButton" onClick={destroyHome}>Delete home</button>
          <HomeEditFormModal />
        </div>
      </div>
    </div>

    <BookingNext />

    <BookingList />

  </div>


  );
};

export default HomeData;
