import { csrfFetch } from "./csrf";
const GET_HOMES = 'homes/getHomes';
const ADD_HOME = 'homes/addHome';

export const getHomes = (homes) => ({     // action creator
  type: GET_HOMES,
  homes,
});

export const addHome= (newHome) => ({
  type: ADD_HOME,
  newHome,
});

// const sessionUser = useSelector(state => state.session.user)
// if (sessionUser.id === homes.userId)

export const fetchHomes = () => async (dispatch) => {      // thunk creator for GET request
  const res = await fetch('/api/homes');
  if (res.ok) {
    const homes = await res.json();

    dispatch(getHomes(homes));
  }
};

export const postHome = (payload) => async (dispatch) => {
  const res = await csrfFetch('/api/homes/new', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  const newHome = await res.json();

  if (res.ok) {
    dispatch(addHome(newHome));
  }
  return newHome;
};


const initialState = { };

const homesReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_HOMES:
      action.homes.forEach((home) => {
        newState[home.id] = home;
      });
      return newState;
    case ADD_HOME:
      return {
        ...state,
        [action.newHome.id]: action.newHome,
      };
    default:
      return state;
  }
}

export default homesReducer;
