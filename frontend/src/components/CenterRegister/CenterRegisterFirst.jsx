import React, { useRef, useState } from 'react';
import styled from 'styled-components';

const CenterRegisterFirst = ({
  setCenterName,
  setMode,
  consoleAll
}) => {
  const ErrorDiv = styled.p`
    background-color: red;
    color: white;
  `

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
        <ErrorDiv>
          {
            setHiddenNameKey === true ?
              <p>{nameMessage}</p> :
              <>{nameMessage}</>
          }
        </ErrorDiv>
      </div>
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

export default CenterRegisterFirst;