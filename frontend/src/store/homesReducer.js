const GET_HOMES = 'homes/getHomes';

export const getHomes = (homes) => ({     // action creator
  type: GET_HOMES,
  homes,
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

const initialState = { };

const homesReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_HOMES:
      action.homes.forEach((home) => {
        newState[home.id] = home;
      });
      return newState;
    default:
      return state;
  }
}

export default homesReducer;
