import React from 'react';

const UserMypageUpdate = (userInfo) => {
  const infoList = userInfo.userInfo
  console.log(infoList);
  return (
    <div>
      <div>
        {infoList.USER_ID}
      </div>
      <div>
        {infoList.USER_PW}
      </div>
      <div>
        {infoList.USER_NAME}
      </div>
      <div>
        {infoList.USER_NICKNAME}
      </div>
      <div>
        {infoList.EMAIL}
      </div>
      <div>
        {infoList.ADDRESS}
      </div>
      <div>
        {infoList.SEX}
      </div>
    </div>
  );
};

export default UserMypageUpdate;