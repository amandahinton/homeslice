import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
import HomeAddFormModal from "../HomeAdd"

import HomeDetail from '../HomeDetail';

import { fetchHomes } from '../../store/homesReducer';

const HomesList = () => {
  const dispatch = useDispatch();

  const homes = useSelector(state => Object.values(state.homes))

  useEffect(() => {
    dispatch(fetchHomes());      // dispatch return value of thunk creator
  }, [dispatch]);

  return (
    <>
      {homes && (
        <div>
          <ul>
            {homes?.map(({ id }) => {
              return <HomeDetail key={id} id={id} />;
            })}
          </ul>
        </div>
      )}
      <HomeAddFormModal />
    </>
  );
};

export default HomesList;
