import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { fetchHomes } from '../../store/homesReducer';
import HomeEditForm from '../HomeEdit/HomeEditForm';

const HomeLoader = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const home = useSelector(state => state.homes[id])

  useEffect(() => {
    dispatch(fetchHomes());
  }, [dispatch]);

  if (home) {
    return (
      <HomeEditForm  originalHome={home}/>
    );
  } else {
    return null
  }
};

export default HomeLoader;
