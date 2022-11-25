import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Test(props) {
  const [test, setTest] = useState("");
  const [hello, setHello] = useState(
    <p style={{ color: "red" }}>
      참고로 이거 <b>State 값</b>을 이용해서 출력하고 있는 것
    </p>
  );
  const [yaDanya, setYaDanya] = useState(
    <p>
      <b style={{ color: "blue" }}>admin_kcj</b> 또는{" "}
      <b style={{ color: "blue" }}>admin_hhj</b> 입력 바람
    </p>
  );
  const adminRef = useRef();
  const navigate = useNavigate();

  function getList() {
    axios
      .post("http://localhost:8008/hi", { ADMIN_ID: adminRef.current.value })
      .then((res) => {
        setTest(res.data[0]);
        console.log(res.data[0]);
      })
      .catch((e) => {
        console.error(e);
      });
  }
  console.log(yaDanya);

  return (
    <div>
      <h1>외않되/. 아마따1</h1>
      <h3>{hello}</h3>
      <h1>않이 이개 머조/</h1>
      <input
        defaultValue=""
        placeholder="Press Enter"
        type="text"
        ref={adminRef}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            if (
              adminRef.current.value === "" ||
              adminRef.current.value === undefined
            ) {
              alert("아이디를 입력하세요.");
              adminRef.current.focus();
              setYaDanya(
                <p>
                  <b>admin_kcj</b> 또는 <b>admin_hhj</b> 입력 바람
                </p>
              );
              return false;
            } else {
              getList();
              adminRef.current.value = "";
            }
          }
        }}
      />
      <br /><br />
      {
        (test === '') ?
          yaDanya :
          (
            <div>
              ID : {test.ADMIN_ID}
              <br /><br />
              PW : {test.ADMIN_PASSWORD}
              <br /><br />
              Nickname : {test.ADMIN_NICKNAME}
              <br /><br />
              <a href="/">Go To Main</a>
            </div>
          )
      }
      <br />
      <input
        type="button"
        value="Go To Chat"
        onClick={() => {
          navigate("/chatjoin");
        }}
      />
      &nbsp;&nbsp;
      <input
        type="button"
        value="회원가입"
        onClick={() => {
          navigate("/userjoin");
        }}
      />
      <br /><br /><br />
      <a href="/video?exec=squat">스쿼트</a>
      &nbsp;&nbsp;
      <a href="/video?exec=pullup">풀업</a>
      &nbsp;&nbsp;
      <a href="/video?exec=pushup">푸쉬업</a>
      &nbsp;&nbsp;
      <a href="/video?exec=situp">싯업</a>
      &nbsp;&nbsp;
      <a href="/video?exec=curl">덤벨컬</a>
      &nbsp;&nbsp;
    </div>
  );
}

export default Test;
