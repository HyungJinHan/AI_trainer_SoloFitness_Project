import axios from 'axios';
import React, { useRef, useState } from 'react';

const RegisterFourth = ({
  consoleAll,
  insertUser,
  setCenterCode,
}) => {

  const [errorMassege, setErrorMessage] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [keyValue, setKeyValue] = useState('');

  const centerNameRef = useRef();
  const centerKeyRef = useRef();

  const jobDone = () => {
    consoleAll();
    insertUser();
  }
  
  const checkOverlap = () => {
    console.log(inputValue, keyValue);
    axios
      .post('http://localhost:8008/centerkeycheck', {
        CENTER_ID: inputValue,
        CENTER_ACCESS_CODE: keyValue,
      })
      .then((res => {
        if ((res.data[0].COUNT >= 1) &&
          (centerNameRef.current.value !== '')) {
          setCenterCode(
            centerNameRef.current.value
          )
          consoleAll();
          insertUser();
        }
        else {
          setKeyValue('');
          centerKeyRef.current.focus();
          setErrorMessage('올바른 인증 번호가 아닙니다.');
        }
      }
      ))
      .catch((e) => {
        console.error(e);
      });
  }

  if (inputValue === '') {
    return (
      <div>
        <div>
          등록한 피트니스 센터가 있나요? <br />
          없다면 건너뛰어 주세요.
        </div>
        <div>
          <input
            type="text"
            name="name"
            defaultValue=''
            ref={centerNameRef}
            autoComplete="off"
            placeholder='피트니스 센터 이름'
            onChange={(e) => { setInputValue(e.target.value); }}
          />
        </div>
        <div>
          <button
            onClick={jobDone}
          >
            건너뛰기
          </button>
        </div>
      </div>
    );
  }
  if (inputValue !== '') {
    return (
      <div>
        <div>
          등록한 피트니스 센터가 있나요? <br />
          없다면 건너뛰어 주세요.
        </div>
        <div>
          <input
            type="text"
            name="name"
            defaultValue=''
            ref={centerNameRef}
            autoComplete="off"
            placeholder='피트니스 센터 이름'
            onChange={(e) => { setInputValue(e.target.value); }}
          />
        </div>
        <div>
          <input
            type="text"
            name="key"
            defaultValue=''
            ref={centerKeyRef}
            autoComplete="off"
            placeholder='인증 번호'
            onChange={(e) => { setKeyValue(e.target.value); }}
          />
          <input
            type='button'
            value='인증 확인'
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
            onClick={jobDone}
          >
            다음
          </button>
        </div>
      </div>
    );
  }
};

export default RegisterFourth;