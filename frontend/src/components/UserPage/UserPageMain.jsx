import axios from "axios";
import { useState, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navigator from "../Navigator/Navigator";

const MainCenter = styled.div`
  text-align: center;
  padding-top: 3.125rem;
  padding-bottom: 6.25rem;
`;

function UserPageMain(props) {
  const inputCountRef = useRef();
  const [inputCount, setInputCount] = useState(0);
  const navigate = useNavigate();

  console.log(inputCount);

  if (
    window.sessionStorage.userID === "" ||
    window.sessionStorage.userID === undefined
  ) {
    alert(`로그인 후 이용 가능합니다.
로그인 페이지로 이동합니다.`);
    navigate("/");
    return false;
  }

  return (
    <MainCenter>
      <input
        type="button"
        value="Go To Chat"
        onClick={() => {
          navigate("/chatjoin");
        }}
      />
      <br />
      <br />
      <input
        placeholder="운동 개수 지정"
        ref={inputCountRef}
        onChange={(e) => {
          setInputCount(e.target.value);
          axios.post("http://localhost:8000/videoshutdown", {
            count: parseInt(e.target.value),
          });
        }}
      />
      <br />
      <br />
      <input
        type="button"
        value="스쿼트"
        onClick={() => {
          if (
            inputCountRef.current.value === "" ||
            inputCountRef.current.value === undefined
          ) {
            alert("운동 개수를 지정해주세요.");
            return false;
          } else {
            navigate("/video?exec=squat", {
              state: { inputCount: inputCount },
            });
          }
        }}
      />
      &nbsp;&nbsp;
      <input
        type="button"
        value="풀업"
        onClick={() => {
          if (
            inputCountRef.current.value === "" ||
            inputCountRef.current.value === undefined
          ) {
            alert("운동 개수를 지정해주세요.");
            return false;
          } else {
            navigate("/video?exec=pullup", {
              state: { inputCount: inputCount },
            });
          }
        }}
      />
      &nbsp;&nbsp;
      <input
        type="button"
        value="푸쉬업"
        onClick={() => {
          if (
            inputCountRef.current.value === "" ||
            inputCountRef.current.value === undefined
          ) {
            alert("운동 개수를 지정해주세요.");
            return false;
          } else {
            navigate("/video?exec=pushup", {
              state: { inputCount: inputCount },
            });
          }
        }}
      />
      &nbsp;&nbsp;
      <input
        type="button"
        value="싯업"
        onClick={() => {
          if (
            inputCountRef.current.value === "" ||
            inputCountRef.current.value === undefined
          ) {
            alert("운동 개수를 지정해주세요.");
            return false;
          } else {
            navigate("/video?exec=situp", {
              state: { inputCount: inputCount },
            });
          }
        }}
      />
      &nbsp;&nbsp;
      <input
        type="button"
        value="덤벨컬"
        onClick={() => {
          if (
            inputCountRef.current.value === "" ||
            inputCountRef.current.value === undefined
          ) {
            alert("운동 개수를 지정해주세요.");
            return false;
          } else {
            navigate("/video?exec=curl", { state: { inputCount: inputCount } });
          }
        }}
      />
      <Navigator />
      <Outlet />
    </MainCenter>
  );
}

export default UserPageMain;
