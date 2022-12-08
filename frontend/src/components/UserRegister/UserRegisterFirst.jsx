import React, { useRef, useState } from "react";
import axios from "axios";
import "../../styles/UserRegister/UserRegister.css";
import Swal from "sweetalert2";

const RegisterFirst = ({ setNickname, setMode, consoleAll }) => {
  /** 중복체크 실행 여부 검사 */
  const [errorKey, setErrorKey] = useState(true);

  const [errorMessage, setErrorMessage] = useState("");

  const nicknameRef = useRef();

  const jobDone = () => {
    if (errorKey === true) {
      setErrorMessage("닉네임 중복 체크를 해주세요.");
      return false;
    }

    setMode(1);
    consoleAll();
  };

  const checkOverlap = () => {
    axios
      .post("http://localhost:8008/usernicknamecheck", {
        USER_NICKNAME: nicknameRef.current.value,
      })
      .then((res) => {
        if (
          nicknameRef.current.value.length < 2 ||
          nicknameRef.current.value.length > 8
        ) {
          setErrorMessage("닉네임 입력 형식을 지켜주세요.");
          nicknameRef.current.focus();
          console.log("nicknameCheck =>", errorMessage);
          return false;
        } else if (res.data[0].COUNT >= 1 && nicknameRef.current.value !== "") {
          setErrorMessage("닉네임이 중복됩니다.");
          nicknameRef.current.value = "";
          nicknameRef.current.focus();
          return false;
        } else {
          Swal.fire({
            title: `닉네임이 중복되지 않습니다. <br>사용하시겠습니까?`,
            showDenyButton: true,
            confirmButtonText: "예",
            denyButtonText: `아니오`,
            denyButtonColor: "red",
          }).then((result) => {
            if (result.isConfirmed) {
              setNickname(nicknameRef.current.value);
              setErrorKey(false);
              setErrorMessage("");
            } else if (result.isDenied) {
              Swal.fire("취소하셨습니다.", "", "error");
              nicknameRef.current.value = "";
              return false;
            }
          });
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };
  return (
    <div className="UserRegister_main">
      <div className="UserRegister_info">
        반가워요!
        <br />
        사용할 닉네임을 알려주세요.
      </div>
      <div className="UserRegister_inputDiv">
        <input
          type="text"
          name="nickname"
          autoComplete="off"
          ref={nicknameRef}
          placeholder="닉네임은 2 ~ 8글자까지 입력하세요."
          className="UserRegister_input"
          onChange={(e) => {
            setNickname(e.target.value);
            setErrorKey(true);
          }}
        />
        <input
          type="button"
          className="UserRegister_overlap"
          value="중복 체크"
          onClick={checkOverlap}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              checkOverlap();
            }
          }}
        />
      </div>
      <div className="UserRegister_error">{errorMessage}</div>
      <input
        className="UserRegister_button"
        value="다음"
        type="button"
        onClick={jobDone}
      />
    </div>
  );
};

export default RegisterFirst;
