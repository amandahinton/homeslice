import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import "../event.css"

const EventData = () => {
  const { id } = useParams();

  const eventData = useSelector((state) => state.events[id]);

  return (
    <div className="eventDataContainer">
      <div className="eventDataDiv">
        <img className="eventDataPhoto" src={eventData?.imageUrl} alt="event" />
        <h2 className="eventDataTitle">{eventData?.title}</h2>
        <p className="eventDataDescription">{eventData?.description}</p>
        <p className="eventDataInterval">To be completed every {eventData?.intervalDays} days</p>
      </div>
    </div>
  );
};

export default EventData;
