import React, { useRef, useState } from 'react';
import Swal from "sweetalert2";

const CenterRegisterSecond = ({
  setCenterID,
  setCenterPW,
  setMode,
  consoleAll
}) => {
  /** 사업자 등록번호 인식 */
  const [hiddenIdKey, setHiddenIdKey] = useState(false);
  const [idMessage, setIdMessage] = useState('');
  /** 비밀번호 인식 */
  const [hiddenPwKey, setHiddenPwKey] = useState(false);
  const [pwMessage, setPwMessage] = useState('');
  /** 비밀번호 확인 인식 */
  const [hiddenPwckKey, setHiddenPwckKey] = useState(false);
  const [pwckMessage, setPwckMessage] = useState('');

  const idRef = useRef();
  const pwRef = useRef();
  const pwckRef = useRef();

  const doneJob = () => {
    if (idRef.current.value === "" || idRef.current.value === undefined) {
      setHiddenIdKey(true);
      setIdMessage(
        <p>사업자 등록번호를 입력하세요.</p>
      )
      idRef.current.focus();
      return false;
    }
    if (idRef.current.value.length < 10) {
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
    else if (pwRef.current.value.length < 8 || pwRef.current.value.length > 15) {
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
      pwckRef.current.focus();
    }

    if (pwRef.current.value !== pwckRef.current.value) {
      setHiddenPwckKey(true);
      setPwckMessage(
        <p>비밀번호가 맞지 않습니다.</p>
      );
      return false;
    }
    else if (pwRef.current.value === pwckRef.current.value) {
      setHiddenPwckKey(false);
      setPwckMessage('');
    }

    setMode(2);
    consoleAll();
  }

  return (
    <div>
      <div>
        <input
          type="text"
          name="id"
          autoComplete="off"
          defaultValue=''
          maxLength="10"
          ref={idRef}
          onChange={(e) => {
            setCenterID(e.target.value)
          }}
          placeholder="센터 사업자 등록 번호 입력"
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              doneJob();
            }
          }}
        />
      </div>
      {
        setHiddenPwKey === true ?
          <p>{idMessage}</p> :
          <>{idMessage}</>
      }
      <div>
        <input
          type="password"
          name="pw"
          ref={pwRef}
          autoComplete="off"
          defaultValue=''
          onChange={(e) => {
            setCenterPW(e.target.value)
          }}
          placeholder="센터 비밀번호 입력"
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              doneJob();
            }
          }}
        />
      </div>
      {
        setHiddenPwKey === true ?
          <p>{pwMessage}</p> :
          <>{pwMessage}</>
      }
      <div>
        <input
          type="password"
          name="pwck"
          ref={pwckRef}
          autoComplete="off"
          defaultValue=''
          placeholder="센터 비밀번호 확인"
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              doneJob();
            }
          }}
        />
      </div>
      {
        setHiddenPwckKey === true ?
          <p>{pwckMessage}</p> :
          <>{pwckMessage}</>
      }
      <div>
        <button
          onClick={
            doneJob
          }
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default CenterRegisterSecond;