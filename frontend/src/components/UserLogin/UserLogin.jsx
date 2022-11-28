import React from 'react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import MainLogo from '../../static/images/HHJ/icons/MainLogo.svg'
import '../../styles/UserLogin/UserLogin.css'

const ErrorDiv = styled.p`
    background-color: red;
    color: white;
    margin: 0;
  `

const MainCenter = styled.div`
    text-align: center;
    padding-top: 3.125rem;
  `;

// 로그인 페이지
function UserLogin() {
  const idRef = useRef();
  const pwRef = useRef();
  const btnRef = useRef();

  const navigate = useNavigate();

  const handleLogin = () => {
    if (idRef.current.value === "" || idRef.current.value === undefined) {
      alert("아이디를 입력하세요.");
      idRef.current.focus();
      return false;
    }
    if (pwRef.current.value === "" || pwRef.current.value === undefined) {
      alert("패스워드를 입력하세요.");
      pwRef.current.focus();
      return false;
    }

    axios
      .post("http://localhost:8008/userlogin", {
        USER_ID: idRef.current.value,
        USER_PW: pwRef.current.value,
      })
      .then((res) => {
        if (res.data[0].cnt === 1) {
          window.sessionStorage.clear();
          window.sessionStorage.setItem("userID", idRef.current.value);
          navigate("/usermain");
        } else {
          alert("아이디 혹은 비밀번호가 틀렸습니다.");
          idRef.current.value = ''
          pwRef.current.value = ''
          navigate("/");
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };
  return (
    <MainCenter>
      <br />
      <br />
      <br />
      <img
        src={MainLogo}
        alt="undefind"
        width='60%'
      />
      <br />
      <br />
      <br />
      <div>
        <input
          className='UserLogin_input'
          type="text"
          name="id"
          ref={idRef}
          autoComplete="off"
          placeholder='임시 -> zx'
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              pwRef.current.focus();
            }
          }}
        />
      </div>
      <div>
        <input
          className='UserLogin_input'
          type="password"
          name="pw"
          ref={pwRef}
          autoComplete="off"
          placeholder='임시 -> zx'
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              btnRef.current.focus();
            }
          }}
        />
      </div>
      <div>
        <input
          className='UserLogin_button'
          value='로그인'
          type='button'
          ref={btnRef}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleLogin();
            }
          }}
          onClick={handleLogin}
        />
      </div>
      <div>
        <a href='http://localhost:3000/userjoin' className='UserLogin_link'>처음이신가요?</a>
        <br />
        <br />
        <a href='http://localhost:3000/centerlogin' className='UserLogin_link'>센터 로그인</a>
      </div>
    </MainCenter>
  );
}

export default UserLogin;