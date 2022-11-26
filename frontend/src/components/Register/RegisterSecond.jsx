import React, { useRef, useState } from 'react';

const RegisterSecond = ({ setUserID, setUserPW, setMode, consoleAll }) => {

  const [hiddenKey, setHiddenKey] = useState(false);

  const pwRef = useRef();
  const pwchRef = useRef();

  const pwCheck = () => {
    if (pwRef.current.value !== pwchRef.current.value) {
      setHiddenKey(true);
      return false
    }
    else if (pwRef.current.value === pwchRef.current.value) {
      setHiddenKey(false);
      setMode(2)
      consoleAll()
    }
  }
  return (
    <div>
      <div>
        <input
          type="text"
          name="nickname"
          autoComplete="off"
          onChange={(e) => {
            setUserID(e.target.value)
          }}
        />
      </div>
      <div>
        <input
          type="text"
          name="nickname"
          ref={pwRef}
          autoComplete="off"
          onChange={(e) => {
            setUserPW(e.target.value)
          }}
        />
      </div>
      <div>
        <input
          type="text"
          name="nickname"
          ref={pwchRef}
          autoComplete="off"
        />
      </div>
      {
        hiddenKey === true ?
          <p>비밀번호가 맞지 않습니다.</p> :
          <></>
      }
      <div>
        <button
          onClick={
            pwCheck
          }
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default RegisterSecond;