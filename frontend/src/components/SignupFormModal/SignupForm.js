import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch} from 'react-redux';

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
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label>
        Username
        <input
          type="text"
          value={username}  // controlled input for username
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        First name
        <input
          type="text"
          value={firstName}  // controlled input for first name
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </label>
      <label>
        Last name
        <input
          type="text"
          value={lastName}  // controlled input for last name
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </label>
      <label>
        Email address
        <input
          type="text"
          value={email}  // controlled input for email
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Phone number
        <input
          type="text"
          value={phone}  // controlled input for phone
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}      // controlled input for password
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label>
        Confirm Password
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignupForm;
