import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CenterControl from './CenterControl';

function CenterMain() {
  const navigate = useNavigate();
  const [mode, setMode] = useState(0);
  const [centerInfo, setCenterInfo] = useState([]);
  const [memberInfo, setMemberInfo] = useState([]);

  const centerID = window.sessionStorage.getItem('centerID');

  const loadCenterInfo = () => {
    axios
      .post("http://localhost:8008/centerInfo", {
        CENTER_ID: centerID,
      })
      .then((res) => {
        setCenterInfo(res.data[0]);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const loadUserList = () => {
    axios
      .post("http://localhost:8008/memberInfo", {
        USER_ACCESS_CODE: centerInfo.CENTER_NAME,
      })
      .then((res) => {
        setMemberInfo(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  useEffect(() => {
    loadUserList();
    loadCenterInfo();
  }, [mode,]);

  console.log('centerInfo=> ', centerInfo);
  console.log('memberInfo=> ', memberInfo);

  if (window.sessionStorage.centerID === '' || window.sessionStorage.centerID === undefined) {
    alert(`로그인 후 이용 가능합니다.
로그인 페이지로 이동합니다.`);
    navigate('/');
    return false;
  }

  if (mode === 0) {
    return (
      <div>
        <div>
          <div>환영합니다</div>
          <div>{centerInfo.CENTER_NAME}</div>
          <div>님</div>
        </div>
        <div>
          <input
            type='button'
            value='회원 정보 현황'
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
              navigate("/centerlogin");
            }}
          />
        </div>
      </div>
    );
  }
  if (mode === 1) {
    return (
      <div>
        <CenterControl setMode={setMode} memberInfo={memberInfo} />
      </div>
    )
  }
}

export default CenterMain;