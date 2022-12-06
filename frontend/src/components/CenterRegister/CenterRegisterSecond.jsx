import axios from 'axios';
import React, { useRef, useState } from 'react';
import '../../styles/CenterRegister/CenterRegister.css'

// 사업자 등록번호와 비밀번호를 인풋받는 컴포넌트

const CenterRegisterSecond = ({
  setCenterID,
  setCenterPW,
  setMode,
  consoleAll
}) => {

  /** 중복체크 실행 여부 검사 */
  const [errorMessage, setErrorMessage] = useState('');
  const [errorKey, setErrorKey] = useState(true);

  const idRef = useRef();
  const pwRef = useRef();
  const pwckRef = useRef();

  const jobDone = () => {
    if (errorKey === true) {
      setErrorMessage('사업자 등록 번호 중복 체크를 해주세요.');
      return false;
    }

    setErrorMessage('');
    pwRef.current.focus();

    if (pwRef.current.value === "" || pwRef.current.value === undefined) {
      setErrorMessage(
        '비밀번호를 입력하세요.'
      )
      pwRef.current.focus();
      return false;
    }
    else if (pwRef.current.value.length < 8 || pwRef.current.value.length > 15) {
      setErrorMessage(
        '비밀번호를 길이를 확인하세요.'
      );
      pwRef.current.focus();
      return false;
    }
    else {
      setErrorMessage('');
      pwckRef.current.focus();
    }

    if (pwRef.current.value !== pwckRef.current.value) {
      setErrorMessage(
        '비밀번호가 맞지 않습니다.'
      );
      return false;
    }
    else if (pwRef.current.value === pwckRef.current.value) {
      setErrorMessage('');
    }

    setMode(2);
    consoleAll();
  }

  async function checkOverlap() {
    await axios
      .post('http://localhost:8008/centeridcheck', {
        CENTER_ID: idRef.current.value
      })
      .then((res => {
        if (idRef.current.value === '') {
          setErrorMessage(
            `사업자 등록번호를 입력하세요.`
          )
          idRef.current.focus();
          return false;
        }
        if (idRef.current.value.length < 10) {
          setErrorMessage(
            `사업자 등록번호 길이를 확인하세요.`
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
              setErrorMessage(
                `사업자 등록번호는 숫자로만 입력해주세요.`
              )
              idRef.current.focus();
              return false;
            }
          }
        }
        if ((res.data[0].COUNT >= 1)) {
          setErrorMessage(
            '사업자 등록번호가 중복됩니다.'
          )
          idRef.current.value = '';
          idRef.current.focus();
          return false;
        }
        if (window.confirm(`사업자 등록번호가 중복되지 않습니다.
사용하시겠습니까?`)) {
          setCenterID(idRef.current.value);
          setErrorKey(false);
          setErrorMessage('')
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
    <div className='CenterRegister_main'>
      <div className='CenterRegister_info'>
        사업자 등록번호와
        <br />
        비밀번호를 입력해주세요.
      </div>
      <div className='CenterRegister_inputDiv'>
        <input
          className='CenterRegister_input'
          type="text"
          name="id"
          autoComplete="off"
          defaultValue=''
          maxLength="10"
          ref={idRef}
          onChange={(e) => {
            setCenterID(e.target.value);
            setErrorKey(true);
          }}
          placeholder="사업자 등록 번호 10자리를 입력해주세요."
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              jobDone();
            }
          }}
        />
        <input
          className='CenterRegister_overlap'
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
      <div>
        <input
          className='CenterRegister_inputSolo'
          type="password"
          name="pw"
          ref={pwRef}
          autoComplete="off"
          defaultValue=''
          onChange={(e) => {
            setCenterPW(e.target.value)
          }}
          placeholder="비밀번호는 8 ~ 15자까지 입력하세요."
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              jobDone();
            }
          }}
        />
      </div>
      <div>
        <input
          className='CenterRegister_inputSolo'
          type="password"
          name="pwck"
          ref={pwckRef}
          autoComplete="off"
          defaultValue=''
          placeholder="비밀번호를 한번 더 입력하세요."
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              jobDone();
            }
          }}
        />
      </div>
      <div className='CenterRegister_error'>
        {errorMessage}
      </div>
      <input
        className='CenterRegister_button'
        value='다음'
        type='button'
        onClick={
          jobDone
        }
      />
    </div>
  );
};

export default CenterRegisterSecond;