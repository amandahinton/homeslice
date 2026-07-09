import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Redirect } from "react-router-dom";
import { fetchHomes } from '../../store/homesReducer';
import HomeEditForm from '../HomeEdit/HomeEditForm';

const HomeLoader = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const home = useSelector(state => state.homes[id])

  const [homesLoaded, setHomesLoaded] = useState(false);

  useEffect(() => {
    dispatch(fetchHomes()).then(() => setHomesLoaded(true));
  }, [dispatch]);

  if (homesLoaded && !home) {
    return <Redirect to="/homes" />;
  }

  if (home) {
    return (
      <HomeEditForm  originalHome={home}/>
    );
  } else {
    return null
  }
};

export default HomeLoader;
