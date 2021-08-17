import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const SingleEvent = () => {
  const { id } = useParams();

  const singleEvent = useSelector((state) => state.events[id]);

  return (
    <div className="singleEvent">
      <h1>{singleEvent?.title}</h1>
      <img src={singleEvent?.imageUrl} alt="event" />
      <p>{singleEvent?.desciption}</p>
      <p>{singleEvent?.intervalDays}</p>
    </div>
  );
};

export default SingleEvent;
