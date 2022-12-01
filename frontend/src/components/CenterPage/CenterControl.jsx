import React from 'react';

const CenterControl = (props) => {
  const memberList = props.memberInfo
  console.log('memberList=>', memberList);
  const memberCount = 1;
  return (
    <div>
      {memberList?.map((ml) => (
        <div key={ml.USER_ID}>
          <div>
          </div>
          <div>
            {ml.USER_NAME}
          </div>
          <div>
            {ml.USER_ID}
          </div>
          <div>
            {ml.USER_SEX}
          </div>
          <div>
            {ml.USER_ADDRESS}
          </div>
        </div>

      ))}
      <div>
        <input
          type='button'
          value='돌아가기'
          onClick={() => {
            props.setMode(0);
          }}
        />
      </div>
    </div>
  );
};

export default CenterControl;