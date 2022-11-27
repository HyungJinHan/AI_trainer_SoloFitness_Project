import axios from 'axios';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';

const ErrorDiv = styled.p`
    background-color: red;
    color: white;
  `
const CenterRegisterFirst = ({
  setCenterName,
  setMode,
  consoleAll
}) => {

  /** 센터 이름 인식 */
  const [hiddenNameKey, setHiddenNameKey] = useState(false);
  const [nameMessage, setNameMessage] = useState('');

  const nameRef = useRef();

  const doneJob = () => {
    if (nameRef.current.value === "" || nameRef.current.value === undefined) {
      setHiddenNameKey(true);
      setNameMessage(
        <p>센터 이름을 입력하세요.</p>
      )
      nameRef.current.focus();
      return false;
    }

    setMode(1);
    consoleAll();
  }

  const checkOverlap = () => {
    axios
      .post('http://localhost:8008/centernamecheck', {
        CENTER_NAME: nameRef.current.value
      })
      .then((res => {
        if ((res.data[0].COUNT >= 1) && (nameRef.current.value !== '')) {
          setHiddenNameKey(true);
          setNameMessage(
            <p>센터 이름이 중복됩니다.</p>
          )
          nameRef.current.value = '';
          nameRef.current.focus();
          return false;
        } else if (nameRef.current.value === '') {
          setHiddenNameKey(true);
          setNameMessage(
            <p>센터 이름을 입력하세요.</p>
          )
          nameRef.current.focus();
          return false;
        } else {
          if (window.confirm(`센터 이름이 중복되지 않습니다.
사용하시겠습니까?`)) {
            setCenterName(nameRef.current.value);
            setHiddenNameKey(true);
            setNameMessage('')
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
  }

  return (
    <div>
      <div>
        <input
          type="text"
          name="centername"
          autoComplete="off"
          defaultValue=''
          ref={nameRef}
          onChange={(e) => {
            setCenterName(e.target.value)
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
        <ErrorDiv>
          {
            setHiddenNameKey === true ?
              <p>{nameMessage}</p> :
              <>{nameMessage}</>
          }
        </ErrorDiv>
      </div>
      <div>
        <input
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