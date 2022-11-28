import React, { useState } from 'react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import axios from 'axios';

const ErrorDiv = styled.p`
    background-color: red;
    color: white;
  `
/** 센터 로그인 페이지 */
function CenterLogin() {
  /** 사업자 등록번호 인식 */
  const [hiddenIdKey, setHiddenIdKey] = useState(false);
  const [idMessage, setIdMessage] = useState('');
  /** 비밀번호 인식 */
  const [hiddenPwKey, setHiddenPwKey] = useState(false);
  const [pwMessage, setPwMessage] = useState('');

  const idRef = useRef();
  const pwRef = useRef();
  const btnRef = useRef();

  const navigate = useNavigate();

  const handleLogin = () => {
    if (idRef.current.value === "" || idRef.current.value === undefined) {
      setHiddenIdKey(true);
      setIdMessage(
        <p>사업자 등록번호를 입력하세요.</p>
      )
      idRef.current.focus();
      return false;
    }
    if (idRef.current.value.length < 1) {
      setHiddenIdKey(true);
      setIdMessage(
        <p>사업자 등록번호 길이를 확인하세요.</p>
      );
      idRef.current.focus();
      return false;
    }
    else {
      const str = idRef.current.value;
      for (var i = 0; i < str.length; i++) {
        const ch = str.substring(i, i + 1);
        if (
          !(ch >= "0" && ch <= "9") ||
          (ch >= "a" && ch <= "z") ||
          (ch >= "A" && ch <= "Z")
        ) {
          setHiddenIdKey(true);
          setIdMessage(
            <p>사업자 등록번호는 숫자로만 입력해주세요.</p>
          )
          idRef.current.focus();
          return false;
        }
      }
    }

    setHiddenIdKey(false);
    setIdMessage('');
    pwRef.current.focus();

    if (pwRef.current.value === "" || pwRef.current.value === undefined) {
      setHiddenPwKey(true);
      setPwMessage(
        <p>비밀번호를 입력하세요.</p>
      )
      pwRef.current.focus();
      return false;
    }
    else if (pwRef.current.value.length < 1 || pwRef.current.value.length > 15) {
      setHiddenPwKey(true);
      setPwMessage(
        <p>비밀번호를 길이를 확인하세요.</p>
      );
      pwRef.current.focus();
      return false;
    }
    else {
      setHiddenPwKey(false);
      setPwMessage('');
    }

    axios
      .post("http://localhost:8008/centerlogin", {
        CENTER_ID: idRef.current.value,
        CENTER_PW: pwRef.current.value,
      })
      .then((res) => {
        if (res.data[0].cnt === 1) {
          window.sessionStorage.clear();
          window.sessionStorage.setItem("centerID", idRef.current.value);
          navigate("/");
        } else {
          alert("로그인 실패");
          idRef.current.value = ''
          pwRef.current.value = ''
          navigate("/centerlogin");
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <div>
      <div>
        <input
          type="text"
          name="id"
          placeholder="사업자 등록번호를 입력해주세요"
          ref={idRef}
          autoComplete="off"
          maxLength="10"
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleLogin();
            }
          }}
        />
        <ErrorDiv>
          {
            setHiddenPwKey === true ?
              <p>{idMessage}</p> :
              <>{idMessage}</>
          }
        </ErrorDiv>
      </div>
      <div>
        <input
          type="password"
          name="pw"
          placeholder="비밀번호를 입력하세요."
          ref={pwRef}
          autoComplete="off"
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleLogin();
            }
          }}
        />
        <ErrorDiv>
          {
            setHiddenPwKey === true ?
              <p>{pwMessage}</p> :
              <>{pwMessage}</>
          }
        </ErrorDiv>
      </div>
      <div>
        <input
          type='button'
          value='로그인'
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
        <a href='http://localhost:3000/centerjoin'>처음이신가요?</a>
      </div>
      <div>
        <a href='http://localhost:3000/userlogin'>유저 로그인</a>
      </div>
    </div>
  );
}

export default CenterLogin;