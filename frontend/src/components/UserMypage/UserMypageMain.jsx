import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Outlet, useNavigate } from 'react-router-dom';
import Navigator from '../Navigator/Navigator';
import UserMypageUpdate from './UserMypageUpdate';

// 마이페이지 중 메인부분, 회원 정보 수정 컴포넌트와 로그아웃 기능,

function UserMypageMain() {
  const [mode, setMode] = useState(0);

  const [userInfo, setUserInfo] = useState([]);

  const userName = window.sessionStorage.getItem('userID');
  const navigate = useNavigate();

  const loadUserInfo = () => {
    axios
      .post("http://localhost:8008/myInfo", {
        USER_ID: userName,
      })
      .then((res) => {
        setUserInfo(res.data[0]);
      })
      .catch((e) => {
        console.log(e);
      });

  };
  useEffect(() => {
    loadUserInfo();
  }, [mode,]);

  console.log('userInfo=> ', userInfo);
  return (
    <div>
      {
        mode === 0 ?
          <div>
            <div>
              <div>환영합니다</div>
              <div>{userInfo.USER_NICKNAME}</div>
              <div>님</div>
            </div>
            <div>
              <input
                type="button"
                value="내 정보 수정"
                onClick={() => {
                  setMode(1);
                }}
              />
            </div>
            <div>
              <input
                type="button"
                value="로그아웃"
                onClick={() => {
                  window.sessionStorage.clear();
                  navigate("/");
                }}
              />
            </div>
          </div>
          :
          null
      }
      {
        mode === 1 ?
          <div>
            <UserMypageUpdate userInfo={userInfo} setMode={setMode} />
          </div>
          :
          null
      }
      <Navigator />
      <Outlet />
    </div>
  );
}

export default UserMypageMain;