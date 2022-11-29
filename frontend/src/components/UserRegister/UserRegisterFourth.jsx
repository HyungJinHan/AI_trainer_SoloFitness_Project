import axios from 'axios';
import React, { useRef, useState } from 'react';
import '../../styles/UserRegister/UserRegister.css'

const RegisterFourth = ({
  consoleAll,
  insertUser,
  setCenterCode,
}) => {

  const [errorMessage, setErrorMessage] = useState('');
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
        CENTER_NAME: inputValue,
        CENTER_ACCESS_CODE: keyValue,
      })
      .then((res => {
        if ((res.data[0].COUNT >= 1) &&
          (centerNameRef.current.value !== '')) {
          setCenterCode(
            centerNameRef.current.value
          )
          setErrorMessage('');
        } else {
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
      <div className='UserRegister_main'>
        <div className='UserRegister_info'>
          등록한 피트니스 센터가 있나요?
          <br />
          없다면 건너뛰어 주세요.
        </div>
        <input
          className='UserRegister_inputSolo'
          type="text"
          name="name"
          defaultValue=''
          ref={centerNameRef}
          autoComplete="off"
          placeholder='피트니스 센터 이름'
          onChange={(e) => { setInputValue(e.target.value); }}
        />
        <input
          value='건너뛰기'
          className='UserRegister_button'
          onClick={jobDone}
        />
      </div>
    );
  }
  if (inputValue !== '') {
    return (
      <div className='UserRegister_main'>
        <div className='UserRegister_info'>
          등록한 피트니스 센터가 있나요? <br />
          없다면 건너뛰어 주세요.
        </div>
        <input
          className='UserRegister_inputSolo'
          type="text"
          name="name"
          defaultValue=''
          ref={centerNameRef}
          autoComplete="off"
          placeholder='피트니스 센터 이름'
          onChange={(e) => { setInputValue(e.target.value); }}
        />
        <div className='UserRegister_inputDiv'>
          <input
            className='UserRegister_input'
            type="text"
            name="key"
            defaultValue=''
            ref={centerKeyRef}
            autoComplete="off"
            placeholder='인증 번호'
            onChange={(e) => { setKeyValue(e.target.value); }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                checkOverlap();
              }
            }}
          />
          <input
            className='UserRegister_overlap'
            type='button'
            value='인증 확인'
            onClick={
              checkOverlap
            }
          />
        </div>
        <div className='UserRegister_error'>
          {errorMessage}
        </div>
        <div>
          <input
            value='다음'
            className='UserRegister_button'
            onClick={
              () => {
                checkOverlap();
                jobDone();
              }
            }
          />
        </div>
      </div>
    );
  }
};

export default RegisterFourth;