import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import ErrorMessage from './ErrorMessage';
import { UserContext } from './UserContext';

function Register(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [chkPassword, setChkPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [, setToken] = useContext(UserContext);

  const submitRegistration = async () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email, hashed_password: password })
    };

    const response = await fetch('/api/users', requestOptions);
    const data = await response.json();

    if (!response.ok) {
      setErrorMessage(data.detail);
    } else {
      setToken(data.access_token);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === chkPassword && password.length >= 10) {
      submitRegistration();
    } else if (password.length < 10) {
      setErrorMessage('Check Your Password Length (Greater than 10 Character)');
    } else if (password !== chkPassword) {
      setErrorMessage('Incorrect Password and Password Check');
    }
  }

  return (
    <div className="column">
      <form className="box" onSubmit={handleSubmit}>
        <h1 className="title has-text-center">Register</h1>
        <div className="field">
          <label className="label">Email Address</label>
          <div className="control">
            <input
              type="email"
              placeholder='Please Enter Email'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              className='input'
              required
              autoComplete='off'
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              type="password"
              placeholder='Please Enter Password'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              className='input'
              required
              autoComplete='off'
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Check Password</label>
          <div className="control">
            <input
              type="password"
              placeholder='Please Check Password'
              value={chkPassword}
              onChange={(e) => {
                setChkPassword(e.target.value)
              }}
              className='input'
              required
              autoComplete='off'
            />
          </div>
        </div>
        <ErrorMessage message={errorMessage} />
        <br />
        <button className="button is-primaty" type='submit'>
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;