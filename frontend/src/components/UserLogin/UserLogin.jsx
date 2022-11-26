import React from 'react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
          navigate("/");
        } else {
          alert("로그인 실패");
          navigate("/userlogin");
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
          ref={idRef}
          autoComplete="off"
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              pwRef.current.focus();
            }
          }}
        />
      </div>
      <div>
        <input
          type="password"
          name="pw"
          ref={pwRef}
          autoComplete="off"
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              btnRef.current.focus();
            }
          }}
        />
      </div>
      <div>
        <button
          ref={btnRef}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleLogin();
            }
          }}
          onClick={handleLogin}
        >
          로그인
        </button>
      </div>
      <div>
        <a href='http://localhost:3000/userjoin'>처음이신가요?</a>
      </div>
      <div>
        <a href='http://localhost:3000/centerlogin'>센터 로그인</a>
      </div>
    </div>
  );
}

export default UserLogin;