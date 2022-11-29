import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navigator from '../Navigator/Navigator';

function UserMypageMain(props) {
  const navigate = useNavigate();

  return (
    <div>
      <input
        type="button"
        value="Logout"
        onClick={() => {
          window.sessionStorage.clear();
          navigate("/");
        }}
      />
      <Navigator />
      <Outlet />
    </div>
  );
}

export default UserMypageMain;