import React, { useContext } from 'react';
import Register from './Register';
import { UserContext } from './UserContext';

function Header(props) {
  const [token, setToken] = useContext(UserContext);

  const handleLogout = () => {
    setToken(null);
  }

  return (
    <>
      <div className="has-text-centered m-6">
        <h1 className="title">{props.title}</h1>
        {
          token && (
            <button className='button' onClick={handleLogout}>
              Logout
            </button>
          )
        }
      </div>
      <div className="columns">
        <div className="column"></div>
        <div className="column m-5 is-two-thirds">
          {
            !token ? (
              <div className="columns">
                <p>Login</p>
                <Register />
              </div>
            ) : (
              <p>Table</p>
            )
          }
        </div>
        <div className="column"></div>
      </div>
    </>
  );
}

export default Header;