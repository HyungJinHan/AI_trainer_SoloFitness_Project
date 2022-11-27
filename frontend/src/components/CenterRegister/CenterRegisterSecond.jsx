import axios from 'axios';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';

const ErrorDiv = styled.p`
    background-color: red;
    color: white;
  `

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

  const checkOverlap = () => {
    axios
      .post('http://localhost:8008/centeridcheck', {
        CENTER_ID: idRef.current.value
      })
      .then((res => {
        if ((res.data[0].COUNT >= 1) && (idRef.current.value !== '')) {
          setHiddenIdKey(true);
          setIdMessage(
            <p>사업자 등록번호가 중복됩니다.</p>
          )
          idRef.current.value = '';
          idRef.current.focus();
          return false;
        } else if (idRef.current.value === '') {
          setHiddenIdKey(true);
          setIdMessage(
            <p>사업자 등록번호를 입력해 주세요.</p>
          )
          idRef.current.value = '';
          idRef.current.focus();
        } else {
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
        if (window.confirm(`사업자 등록번호가 중복되지 않습니다.
사용하시겠습니까?`)) {
          setCenterID(idRef.current.value);
          setHiddenIdKey(true);
          setIdMessage('')
        } else {
          alert('취소하셨습니다.');
          idRef.current.value = '';
          return false;
        }
      }
      ))
      .catch((e) => {
        console.error(e);
      });
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
        <input
          type='button'
          value='중복 체크'
          onClick={
            checkOverlap
          }
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              checkOverlap();
            }
          }}
        />
      </div>
      <ErrorDiv>
        {
          setHiddenPwKey === true ?
            <p>{idMessage}</p> :
            <>{idMessage}</>
        }
      </ErrorDiv>
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
      <ErrorDiv>
        {
          setHiddenPwKey === true ?
            <p>{pwMessage}</p> :
            <>{pwMessage}</>
        }
      </ErrorDiv>
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
      <ErrorDiv>
        {
          setHiddenPwckKey === true ?
            <p>{pwckMessage}</p> :
            <>{pwckMessage}</>
        }
      </ErrorDiv>
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