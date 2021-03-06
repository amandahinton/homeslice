import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,      // database - user: {id, username, email, createdAt, updatedAt}
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

export const restoreUser = () => async dispatch => {      // add current user to Redux store
  const response = await csrfFetch('/api/session');      // call GET /api/session
  const data = await response.json();      // parse JSON response body
  dispatch(setUser(data.user));      // dispatch action to set session user to res body user
  return response;
};

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({credential, password,}),
  });
  await response.json();
  window.location = "/homes";
};

export const signup = (user) => async (dispatch) => {
  const { username, firstName, lastName, email, phone, password } = user;
  const response = await csrfFetch('/api/users', {
    method: 'POST',
    body: JSON.stringify({ username, firstName, lastName, email, phone, password }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const logout = () => async (dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE',
  });
  dispatch(removeUser());
  return response;
};

const initialState = {user: null};
const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      window.location = "/";
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
