import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navigator from '../Navigator/Navigator';

function CenterMain(props) {
  const navigate = useNavigate();

  if (window.sessionStorage.centerID === '' || window.sessionStorage.centerID === undefined) {
    alert(`로그인 후 이용 가능합니다.
로그인 페이지로 이동합니다.`);
    navigate('/');
    return false;
  }

  return (
    <div>
      <input
        type="button"
        value="Logout"
        onClick={() => {
          window.sessionStorage.clear();
          navigate("/centerlogin");
        }}
      />
      <div>
        여기서 센터 관리함
      </div>
      <Navigator />
      <Outlet />
    </div>
  );
}

export default CenterMain;