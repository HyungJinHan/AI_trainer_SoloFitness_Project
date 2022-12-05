import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import "../../styles/AdminPage/AdminPageLogin.css";
import MainLogo from "../../static/images/HHJ/icons/MainLogo.svg";

const MainCenter = styled.div`
  text-align: center;
  padding-top: 3.125rem;
`;

function AdminPageLogin(props) {
  const [errorKey, setErrorKey] = useState(true);
  const [errorMassege, setErrorMassege] = useState("");
  const idRef = useRef();
  const pwRef = useRef();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (idRef.current.value === "" || idRef.current.value === undefined) {
      setErrorKey(true);
      setErrorMassege("아이디를 입력하세요.");
      idRef.current.focus();
      return false;
    }
    if (pwRef.current.value === "" || pwRef.current.value === undefined) {
      setErrorKey(true);
      setErrorMassege("패스워드를 입력하세요.");
      pwRef.current.focus();
      return false;
    }

    axios
      .post("http://localhost:8008/adminlogin", {
        ADMIN_ID: idRef.current.value,
        ADMIN_PW: pwRef.current.value,
      })
      .then((res) => {
        if (res.data[0].cnt === 1) {
          window.sessionStorage.clear();
          window.sessionStorage.setItem("adminID", idRef.current.value);
          navigate("/adminuser");
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
      <img src={MainLogo} alt="undefind" />
      <br />
      <br />
      <br />
      <div>
        <input
          className="AdminLogin_input"
          type="text"
          name="id"
          ref={idRef}
          autoComplete="off"
          placeholder="임시 -> admin_hhj"
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              pwRef.current.focus();
            }
          }}
        />
      </div>
      <div>
        <input
          className="AdminLogin_input"
          type="password"
          name="pw"
          ref={pwRef}
          autoComplete="off"
          placeholder="임시 -> hhj961210"
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleLogin();
            }
          }}
        />
      </div>
      <div className="AdminLogin_error">{errorMassege}</div>
      <div>
        <input
          className="AdminLogin_button"
          value="관리자 로그인"
          type="button"
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleLogin();
            }
          }}
          onClick={handleLogin}
        />
      </div>
    </MainCenter>
  );
}

export default AdminPageLogin;
