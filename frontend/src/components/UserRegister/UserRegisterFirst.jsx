import React, { useRef, useState } from 'react';
import axios from 'axios';

const RegisterFirst = ({ setNickname, setMode, consoleAll }) => {
  /** 중복체크 실행 여부 검사 */
  const [errorKey, setErrorKey] = useState(true);

  const [errorMassege, setErrorMassege] = useState('');

  const nicknameRef = useRef();

  const jobDone = () => {
    if (errorKey === true) {
      setErrorMassege('센터 이름 중복 체크를 해주세요.');
      return false
    }

    setMode(1);
    consoleAll();

  }

  const checkOverlap = () => {
    axios
      .post('http://localhost:8008/usernicknamecheck', {
        USER_NICKNAME: nicknameRef.current.value
      })
      .then((res => {
        if (nicknameRef.current.value.length < 2
          || nicknameRef.current.value.length > 8) {
          setErrorMassege('닉네임 입력 형식을 지켜주세요.');
          nicknameRef.current.focus();
          console.log("nicknameCheck =>", errorMassege);
          return false;
        }
        else if ((res.data[0].COUNT >= 1) && (nicknameRef.current.value !== '')) {
          setErrorMassege(
            '닉네임이 중복됩니다.'
          )
          nicknameRef.current.value = '';
          nicknameRef.current.focus();
          return false;
        }
        else {
          if (window.confirm(`닉네임이 중복되지 않습니다.
사용하시겠습니까?`)) {
            setNickname(nicknameRef.current.value);
            setErrorKey(false);
            setErrorMassege('')
          } else {
            alert('취소하셨습니다.');
            nicknameRef.current.value = '';
            return false;
          }
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
          name="nickname"
          autoComplete="off"
          ref={nicknameRef}
          placeholder='닉네임은 2 ~ 8글자까지 입력하세요.'
          onChange={(e) => {
            setNickname(e.target.value);
            setErrorKey(true);
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
      <div>
        {errorMassege}
      </div>
      <div>
        <button
          onClick={
            jobDone
          }
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default RegisterFirst;