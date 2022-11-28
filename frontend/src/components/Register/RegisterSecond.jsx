import React, { useRef, useState } from 'react';
import axios from 'axios';

const RegisterSecond = ({
  setUserID,
  setUserPW,
  setMode,
  consoleAll
}) => {

  const [errorMassege, setErrorMassege] = useState('');

  const [errorKey, setErrorKey] = useState(true);

  const idRef = useRef();
  const pwRef = useRef();
  const pwchRef = useRef();

  const jobDone = () => {
    if (errorKey === true) {
      setErrorMassege('아이디 중복 체크를 해주세요.');
      return false;
    }
    if (pwRef.current.value.length > 12 ||
      pwRef.current.value.length < 2) {
      setErrorMassege('비밀번호 입력 형식을 지켜주세요.');
      pwRef.current.focus();
      return false;
    } else {
      setErrorMassege('');
    }
    if (pwRef.current.value !== pwchRef.current.value) {
      setErrorMassege('비밀번호가 확인란과 다릅니다.');
      pwchRef.current.focus();
      return false;
    } else {
      setErrorMassege('');

    }

    setMode(2);
    consoleAll();

  }

  const idCheck = () => {
    axios
      .post('http://localhost:8008/useridcheck', {
        USER_ID: idRef.current.value
      })
      .then((res => {
        // TypeError발생하였으나 데이터 전달은 잘 됨 추후 수정
        if (idRef.current.value.length < 2
          || idRef.current.value.length > 8) {
          setErrorMassege('아이디 입력 형식을 지켜주세요.');
          idRef.current.focus();
          console.log("nicknameCheck =>", errorMassege);
          return false;
        }
        else if ((res.data[0].COUNT >= 1) && (idRef.current.value !== '')) {
          setErrorMassege(
            '아이디가 중복됩니다.'
          )
          idRef.current.value = '';
          idRef.current.focus();
          return false;
        }
        else {
          if (window.confirm(`아이디가 중복되지 않습니다.
사용하시겠습니까?`)) {
            setUserID(idRef.current.value);
            setErrorKey(false);
            setErrorMassege('')
          } else {
            alert('취소하셨습니다.');
            idRef.current.value = '';
            return false;
          }
        }
      }
      ))
      .catch((e) => {
        console.error(e);
      });
  }

  const pwCheck = () => {
    if (pwRef.current.value.length > 12 ||
      pwRef.current.value.length < 2) {
      setErrorMassege('비밀번호 입력 형식을 지켜주세요.');
      pwRef.current.focus();
      return false;
    }
    if (pwRef.current.value !== pwchRef.current.value) {
      setErrorMassege('비밀번호가 확인란과 다릅니다.');
      pwchRef.current.focus();
      return false;
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          name="name"
          ref={idRef}
          autoComplete="off"
          placeholder='아이디는 6 ~ 14자까지 입력하세요.'
          onChange={(e) => {
            setUserID(e.target.value);
            setErrorKey(true);
          }}
        />
        <input
          type='button'
          value='중복 체크'
          onClick={
            idCheck
          }
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              idCheck();
            }
          }}
        />
      </div>
      <div>
        <input
          type="text"
          name="pw"
          ref={pwRef}
          autoComplete="off"
          placeholder='비밀번호는 6 ~ 14자까지 입력하세요.'
          onChange={(e) => {
            setUserPW(e.target.value)
          }}
        />
      </div>
      <div>
        <input
          type="text"
          name="pwch"
          ref={pwchRef}
          autoComplete="off"
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

export default RegisterSecond;