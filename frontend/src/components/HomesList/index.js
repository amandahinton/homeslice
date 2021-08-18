import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import HomeDetail from '../HomeDetail';
import HomeData from '../HomeData';
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
          {homes?.map(({ id, street }) => {
            return <HomeDetail key={id} id={id} street={street} />;
          })}
        </ul>

        <Switch>
          <Route path="/homes/:id">
            <HomeData homes={homes} />
          </Route>
        </Switch>
      </div>
    )}
    </>
  );
};

export default HomesList;
