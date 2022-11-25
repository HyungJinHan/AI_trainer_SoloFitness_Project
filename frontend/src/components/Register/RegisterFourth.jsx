import React from 'react';

const RegisterFourth = ({
  setMode,
  consoleAll,
  insertUser,
}) => {

  const jobDone = () => {
    consoleAll();
    insertUser();
  }
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
          autoComplete="off"
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
};

export default RegisterFourth;