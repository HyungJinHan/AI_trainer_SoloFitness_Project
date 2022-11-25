import React from 'react';

const RegisterThird = ({
  setUserName,
  setUserSex,
  setUserTel,
  setUserEmail,
  setMode,
  consoleAll
}) => {

  const doneJob = () => {
    consoleAll();
    setMode(3);
  }

  return (
    <div>
      <div>
        <input
          type="text"
          name="name"
          autoComplete="off"
          onChange={(e) => {
            setUserName(e.target.value)
          }}
        />
      </div>
      <div>
        <input
          type="text"
          name="sex"
          autoComplete="off"
          onChange={(e) => {
            setUserSex(e.target.value)
          }}
        />
      </div>
      <div>
        <input
          type="text"
          name="tel"
          autoComplete="off"
          onChange={(e) => {
            setUserTel(e.target.value)
          }}
        />
      </div>
      <div>
        <input
          type="text"
          name="email"
          autoComplete="off"
          onChange={(e) => {
            setUserEmail(e.target.value)
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

export default RegisterThird;