import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import "../../context/Modal.css"

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });      // dispatch login thunk action with form values
  }

  return (
    <div className="loginFormDiv">
      <div className="formTitleDiv">
        <h1 className="formTitle">Log in</h1>
      </div>
      <div className="formFieldsDiv">
        <form className="loginForm" onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          <label className="formLabel">
            Username or Email
            <input
              className="formInput"
              type="text"
              value={credential}      // controlled input for username/email
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </label>
          <label className="formLabel">
            Password
            <input
              className="formInput"
              type="password"
              value={password}      // controlled input for password
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button
            className="formButton"
            type="submit"
          >Log In</button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
