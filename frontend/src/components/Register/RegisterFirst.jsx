import React from 'react';

const RegisterFirst = ({ setNickname, setMode, consoleAll }) => {

  const doneJob = () => {
    setMode(1);
    consoleAll();
  }
  return (
    <div>
      <div>
        <input
          type="text"
          name="nickname"
          autoComplete="off"
          onChange={(e) => {
            setNickname(e.target.value)
          }}
        />
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

export default RegisterFirst;