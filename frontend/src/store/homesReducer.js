import { csrfFetch } from "./csrf";

////// action types //////
const GET_HOMES = 'homes/getHomes';
const ADD_HOME = 'homes/addHome';
const EDIT_HOME = 'homes/editHome';
const REMOVE_HOME = 'homes/removeHome';

////// action creators //////
export const getHomes = (homes) => ({
  type: GET_HOMES,
  homes,
});

export const addHome= (newHome) => ({
  type: ADD_HOME,
  newHome,
});

export const editHome = (editedHome) => ({
  type: EDIT_HOME,
  editedHome,
});

export const removeHome = (deletedHome) => ({
  type: REMOVE_HOME,
  deletedHome,
});

////// thunk creators //////
export const fetchHomes = () => async (dispatch) => {
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

export const updateHome = (home) => async (dispatch) => {
  const res = await csrfFetch(`/api/homes/${home.id}/edit`, {
    method: 'PUT',
    body: JSON.stringify(home),
  });
  const editedHome = await res.json();

  if (res.ok) {
    dispatch(editHome(editedHome));
  }
  return editedHome;
};

export const deleteHome = (homeId) => async (dispatch) => {
  const res = await csrfFetch(`/api/homes/${homeId}`, {
    method: 'DELETE',
    // body: JSON.stringify(homeId),
  });
  const deletedHome = await res.json();

  if (res.ok) {
    dispatch(removeHome(deletedHome));
  }
  return deletedHome;
};

////// reducer //////

const initialState = { };

const homesReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_HOMES:
      newState = {};
      action.homes.forEach((home) => {
        newState[home.id] = home;
      });
      return newState;
    case ADD_HOME:
      return {
        ...state,
        [action.newHome.id]: action.newHome,
      };
    case EDIT_HOME: {
      return {
        ...state,
        [action.editedHome.id]: action.editedHome,
      };
    }
    case REMOVE_HOME: {
      if (newState[action.deletedHome]) delete newState[action.deletedHome];
      return newState;
    }
    default:
      return state;
  }
}

export default homesReducer;
