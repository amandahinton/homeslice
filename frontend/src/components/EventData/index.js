import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import "../event.css"

const EventData = () => {
  const { id } = useParams();

  const eventData = useSelector((state) => state.events[id]);

  return (
    <div className="eventDataDiv">
      <h1 className="eventDataTitle">{eventData?.title}</h1>
      <img className="eventDataPhoto" src={eventData?.imageUrl} alt="event" />
      <p className="eventDataDescription">{eventData?.description}</p>
      <p className="eventDataInterval">To be completed every {eventData?.intervalDays} days</p>
    </div>
  );
};

export default EventData;
