import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CenterControl from './CenterControl';
import ReactPlayer from "react-player";
import CenterUpload from './CenterUpload';
import '../../styles/CenterPage/CenterPage.css'

// 센터로 로그인 하면 나타나는 페이지, 센터 회원 현황과 동영상 업로드 가능
// mode로 컴포넌트를 구분한다.

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
      <div className='CenterPage_main'>
        <div className='CenterPage_info'>
          <div>환영합니다</div>
          <div>{centerInfo.CENTER_NAME} 님</div>
        </div>
        <div>
          <input
            className='CenterPage_button'
            type='button'
            value='회원 정보 현황'
            onClick={() => {
              setMode(1);
            }}
          />
        </div>
        <div>
          <input
            className='CenterPage_button'
            type='button'
            value='동영상 업로드'
            onClick={() => {
              setMode(2);
            }}
          />
        </div>
        <div>
          <input
            className='CenterPage_button'
            type='button'
            value='업로드한 동영상 목록'
            onClick={() => {
              navigate('/videolist');
            }}
          />
        </div>
        <div>
          <input
            className='CenterPage_button'
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
  } else if (mode === 2) {
    return (
      <div>
        <CenterUpload setMode={setMode} />
      </div>
    )
  }
}

export default CenterMain;