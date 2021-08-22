import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch} from 'react-redux';
import "../../context/Modal.css"

function SignupForm() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  //demo user login
  const user = { credential: "guest", password: "password" }

  const demoLogin = (e) => {
    e.preventDefault();
    dispatch(sessionActions.login(user));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ username, firstName, lastName, email, phone, password }))    // dispatch signup thunk action with form values
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <div className="signupFormDiv">
      <div className="formTitleDiv">
        <h1 className="formTitle">Create new account</h1>
      </div>

      <div className="formErrorsDiv">
        <ul className="formErrorsList">
          {errors.map((error, idx) => <li className="formErrorsItem" key={idx}>{error}</li>)}
        </ul>
      </div>


      <div className="formFieldsDiv">
        <form className="signupForm" onSubmit={handleSubmit}>

          <label className="formLabel">
            Username
            <input
              className="formInput"
              type="text"
              value={username}  // controlled input for username
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <label className="formLabel">
            First name
            <input
              className="formInput"
              type="text"
              value={firstName}  // controlled input for first name
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </label>
          <label className="formLabel">
            Last name
            <input
              className="formInput"
              type="text"
              value={lastName}  // controlled input for last name
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </label>
          <label className="formLabel">
            Email address
            <input
              className="formInput"
              type="text"
              value={email}  // controlled input for email
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="formLabel">
            Phone number
            <input
              className="formInput"
              type="text"
              value={phone}  // controlled input for phone
              onChange={(e) => setPhone(e.target.value)}
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
          <label className="formLabel">
            Confirm Password
            <input
              className="formInput"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          <button
            className="formButton"
            type="submit"
          >Sign Up</button>
        </form>
      </div>
      <div className="demo-user-div">
        <p className="demo-user-prompt">Want to take a look around first?</p>
        <p className="demo-user-prompt">Sign in to the demo account.</p>
        <button className="secondaryButton" id="demo-user-button" onClick={demoLogin}>
          Try it out
        </button>
      </div>
    </div>
  );
}

export default SignupForm;
