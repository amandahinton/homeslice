import { NavLink } from 'react-router-dom';

const EventDetail = ({ id, title }) => {
  return (
    <li>
      <NavLink to={`/events/${id}`}>{title}</NavLink>
    </li>
  );
};

export default EventDetail;
