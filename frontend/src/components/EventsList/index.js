import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import EventDetail from '../EventDetail';
import SingleEvent from '../SingleEvent';
import { fetchEvents } from '../../store/eventsReducer';

const EventsList = () => {
  const dispatch = useDispatch();

  const events = useSelector(state => Object.values(state.events))

  useEffect(() => {
    dispatch(fetchEvents());      // dispatch return value of thunk creator
  }, [dispatch]);

  return (
    <>
    {events && (
      <div>
        <h1>Browse Events</h1>
        <ul>
          {events?.map(({ id, title }) => {
            return <EventDetail key={id} id={id} title={title} />;
          })}
        </ul>

        <Switch>
          <Route path="/events/:id">
            <SingleEvent events={events} />
          </Route>
        </Switch>
      </div>
    )}
    </>
  );
};

export default EventsList;
