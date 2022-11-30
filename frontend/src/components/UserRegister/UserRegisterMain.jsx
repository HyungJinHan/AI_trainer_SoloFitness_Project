import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RegisterFirst from './UserRegisterFirst';
import RegisterFourth from './UserRegisterFourth';
import RegisterSecond from './UserRegisterSecond';
import RegisterThird from './UserRegisterThird';
import '../../styles/UserRegister/UserRegister.css'

const RegisterMain = () => {
  const [mode, setMode] = useState(0);
  const [nickname, setNickname] = useState('');
  const [userID, setUserID] = useState('');
  const [userPW, setUserPW] = useState('');
  const [userName, setUserName] = useState('');
  const [userSex, setUserSex] = useState('');
  const [userTel, setUserTel] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userAddr, setUserAddr] = useState('');
  const [centerName, setCenterName] = useState(null);

  const consoleAll = () => {
    console.log('mode =>', mode);
    console.log('nickname =>', nickname);
    console.log('userID =>', userID);
    console.log('userPW =>', userPW);
    console.log('userName =>', userName);
    console.log('userSex =>', userSex);
    console.log('userTel =>', userTel);
    console.log('userEmail =>', userEmail);
    console.log('userAddr =>', userAddr);
    console.log('centerCode =>', centerName);
  };

  const insertUser = () => {
    axios
      .post("http://localhost:8008/userjoin", {
        USER_ID: userID,
        USER_PW: userPW,
        USER_NAME: userName,
        USER_NICKNAME: nickname,
        USER_EMAIL: userEmail,
        USER_ADDRESS: userAddr,
        USER_TEL: userTel,
        USER_SEX: userSex,
        USER_ACCESS_CODE: centerName,
      })
      .then((res) => {
        if (res.data.affectedRows === 1) {
          setMode(4)
        } else {
          alert("회원가입 실패");
        }
      })
      .catch((e) => {
        console.error(e);
      });
  }

  if (mode === 0) {
    return (
      <div>
        <RegisterFirst
          setNickname={setNickname}
          setMode={setMode}
          consoleAll={consoleAll}
        />
      </div>
    )
  }
  if (mode === 1) {
    return (
      <div>
        <RegisterSecond
          setUserID={setUserID}
          setUserPW={setUserPW}
          setMode={setMode}
          consoleAll={consoleAll}
        />
      </div>
    )
  }
  if (mode === 2) {
    return (
      <div>
        <RegisterThird
          setUserName={setUserName}
          setUserSex={setUserSex}
          setUserTel={setUserTel}
          setUserEmail={setUserEmail}
          setUserAddr={setUserAddr}
          setMode={setMode}
          consoleAll={consoleAll}
        />
      </div>
    )
  }
  if (mode === 3) {
    return (
      <div>
        <RegisterFourth
          setMode={setMode}
          consoleAll={consoleAll}
          insertUser={insertUser}
          setCenterName={setCenterName}
        />
      </div>
    )
  }
  if (mode === 4) {
    return (
      <div className='UserRegister_main'>
        <div className='UserRegister_info'>
          회원가입이
          <br />
          성공적으로 이뤄졌습니다!
        </div>
        <div>
          <Link to='/'>
            <input
              className='UserRegister_button'
              type='button'
              value='로그인 하러 가기'
            />
          </Link>
        </div>
      </div>
    )
  }
};

export default RegisterMain;