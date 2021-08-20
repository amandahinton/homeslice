import { useSelector } from 'react-redux';
import "../home.css"

const EventsCatDetail = ({ id }) => {
  const eventsCatsData = useSelector(state => state.eventsCats[id])
  return (
    <li className="qq">
      <p className="qq">{eventsCatsData?.categoryId} catId</p>
      <p className="qq">{eventsCatsData?.eventId} eventId</p>
    </li>
  );
};

export default EventsCatDetail;
