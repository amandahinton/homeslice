import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HomeAddFormModal from "../HomeAdd"
import HomeDetail from '../HomeDetail';
import { fetchHomes } from '../../store/homesReducer';
import "../home.css"

const HomesList = () => {
  const dispatch = useDispatch();

  const homes = useSelector(state => Object.values(state.homes))

  useEffect(() => {
    dispatch(fetchHomes());      // dispatch return value of thunk creator
  }, [dispatch]);

  return (
    <div className="homeListDiv">
      <ul className="homeList">
          {homes && homes?.map(({ id }) => {
          return <HomeDetail key={id} id={id} />;
        })}
      </ul>
      <div className="homeListAddButton">
        <HomeAddFormModal className="homeListAddComp"/>
      </div>
    </div>
  );
};

export default HomesList;
