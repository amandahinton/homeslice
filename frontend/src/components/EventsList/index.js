import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import EventDetail from '../EventDetail';
import EventData from '../EventData';
import { fetchEvents } from '../../store/eventsReducer';

const EventsList = () => {
  const dispatch = useDispatch();

  const events = useSelector(state => Object.values(state.events))

  useEffect(() => {
    dispatch(fetchEvents());      // dispatch return value of thunk creator
  }, [dispatch]);

  return (
      <div className="all-event-page">

        <div className="event-list">
          <div className="event-list-content">
            <h1 className="event-list-title">Browse Suggested Tasks</h1>
            <ul>
              {events && events?.map(({ id, title }) => {
                return <EventDetail key={id} id={id} title={title} />;
              })}
            </ul>
          </div>
        </div>

        <div className="event-preview">
            <Switch>
              <Route path="/events/:id">
                <EventData events={events} />
              </Route>
            </Switch>
        </div>

      </div>
  );
};

export default EventsList;
