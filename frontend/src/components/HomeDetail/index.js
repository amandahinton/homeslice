import { NavLink } from 'react-router-dom';

const HomeDetail = ({ id, street }) => {
  return (
    <li>
      <NavLink to={`/homes/${id}`}>{street}</NavLink>
    </li>
  );
};

export default HomeDetail;
