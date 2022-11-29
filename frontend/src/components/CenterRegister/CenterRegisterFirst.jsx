import axios from 'axios';
import React, { useRef, useState } from 'react';
import '../../styles/CenterRegister/CenterRegister.css'

const CenterRegisterFirst = ({
  setCenterName,
  setMode,
  consoleAll
}) => {
  /** 중복체크 실행 여부 검사 */
  const [errorKey, setErrorKey] = useState(true);

  const [errorMessage, setErrorMessage] = useState('');

  const nameRef = useRef();

  const doneJob = () => {
    if (errorKey === true) {
      setErrorMessage('센터 이름 중복 체크를 해주세요.');
      return false
    }
    setMode(1);
    consoleAll();
  };

  const checkOverlap = () => {
    axios
      .post('http://localhost:8008/centernamecheck', {
        CENTER_NAME: nameRef.current.value
      })
      .then((res => {
        if ((res.data[0].COUNT >= 1) && (nameRef.current.value !== '')) {
          setErrorMessage('센터 이름이 중복됩니다.')
          nameRef.current.value = '';
          nameRef.current.focus();
          return false;
        } else if (nameRef.current.value === '') {
          setErrorMessage(
            '센터 이름을 입력하세요.'
          );
          nameRef.current.focus();
          return false;
        } else {
          if (window.confirm(`센터 이름이 중복되지 않습니다.
사용하시겠습니까?`)) {
            setCenterName(nameRef.current.value);
            setErrorKey(false);
            setErrorMessage('')
          } else {
            alert('취소하셨습니다.');
            nameRef.current.value = '';
            return false;
          }

        }
      }))
      .catch((e) => {
        console.error(e);
      });
    console.log("checkOverlap errorKey", errorKey);

  }

  return (
    <div className='CenterRegister_main'>
      <div className='CenterRegister_info'>
        반갑습니다!
        <br />
        업주님의 센터 이름을 알려주세요.
      </div>
      <div className='CenterRegister_inputDiv'>
        <input
          className='CenterRegister_input'
          type="text"
          name="centername"
          autoComplete="off"
          defaultValue=''
          ref={nameRef}
          onChange={(e) => {
            setCenterName(e.target.value);
            setErrorKey(true);
          }}
          placeholder="센터 이름 입력"
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              doneJob();
            }
          }}
        />
        <input
          type='button'
          className='CenterRegister_overlap'
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
      <div className='CenterRegister_error'>
        {errorMessage}
      </div>
      <div>
        <input
          className='CenterRegister_button'
          type='button'
          value='다음'
          onClick={
            doneJob
          }
        />
      </div>
    </div>
  );
};

export default CenterRegisterFirst;