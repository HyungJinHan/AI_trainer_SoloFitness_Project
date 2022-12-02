import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 회원 정보 수정 컴포넌트, 이름, 아이디, 등록센터 변경 불가능
// 회원 탈퇴기능도 여기 있다.

const UserMypageUpdate = (props) => {
  const navigate = useNavigate();

  const infoList = props.userInfo
  const userImage = `${infoList.USER_IMAGE}`
  console.log('userImage=>', userImage);
  const [imageName, setImageName] = useState(userImage);

  const idRef = useRef();
  const pwRef = useRef();
  const nameRef = useRef();
  const nicknameRef = useRef();
  const emailRef = useRef();
  const addrRef = useRef();
  const telRef = useRef();

  function onImage(e) {
    setImageName(URL.createObjectURL(e.target.files[0]));

    console.log(imageName);
  }

  const updateMyInfo = () => {
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    axios
      .post("http://localhost:8008/updatemyInfo", {
        USER_ID: idRef.current.value,
        USER_PW: pwRef.current.value,
        USER_NAME: nameRef.current.value,
        USER_NICKNAME: nicknameRef.current.value,
        USER_EMAIL: emailRef.current.value,
        USER_ADDRESS: addrRef.current.value,
        USER_TEL: telRef.current.value,
        USER_IMAGE: imageName,
      },
        config
      )
      .then((res) => {
        console.log(res.status);
        if (res.status === 200) {
          console.log("업데이트 완료");
          props.setMode(0);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteUser = () => {
    axios
      .post("http://localhost:8008/deleteuser", {
        USER_ID: infoList.USER_ID,
      })
      .then((res) => {
        console.log('회원탈퇴 성공', res);
        window.sessionStorage.clear();
        navigate('/');
      })
      .catch((e) => {
        console.log(e);
      });

  };

  return (
    <div>
      <div>
        <p>내 정보 수정</p>
      </div>
      <div>
        {infoList.USER_IMAGE && (
          <img src={imageName} alt="sample" width="9.375rem" height="9.375rem"></img>
        )}
      </div>
      <div>
        <input
          id="ex_file"
          type="file"
          name="image"
          accept="image/*"
          onChange={onImage}
        />
      </div>
      <div>
        <p>닉네임</p>
        <input
          type='text'
          name='myname'
          ref={nicknameRef}
          autoComplete="off"
          defaultValue={infoList.USER_NICKNAME}
        />
      </div>
      <div>
        <p>이름</p>
        <input
          type='text'
          name='myname'
          ref={nameRef}
          autoComplete="off"
          readOnly
          defaultValue={infoList.USER_NAME}
        />
      </div>
      <div>
        <p>아이디</p>
        <input
          type='text'
          name='myname'
          ref={idRef}
          autoComplete="off"
          readOnly
          defaultValue={infoList.USER_ID}
        />
      </div>
      <div>
        <p>비밀번호</p>
        <input
          type='password'
          name='myname'
          ref={pwRef}
          autoComplete="off"
          defaultValue={infoList.USER_PW}
        />
      </div>
      <div>
        <p>이메일</p>
        <input
          type='text'
          name='myname'
          ref={emailRef}
          autoComplete="off"
          defaultValue={infoList.USER_EMAIL}
        />
      </div>
      <div>
        <p>전화번호</p>
        <input
          type='text'
          name='mytel'
          ref={telRef}
          autoComplete="off"
          defaultValue={infoList.USER_TEL}
        />
      </div>
      <div>
        <p>주소</p>
        <input
          type='text'
          name='myname'
          ref={addrRef}
          autoComplete="off"
          defaultValue={infoList.USER_ADDRESS}
        />
      </div>
      {
        infoList.USER_ACCESS_CODE === null ? null :
          <div>
            <p>등록센터</p>
            <input
              type='text'
              name='myname'
              ref={addrRef}
              autoComplete="off"
              readOnly
              defaultValue={infoList.USER_ACCESS_CODE}
            />
          </div>
      }
      <div>
        <input
          type='button'
          name='updatebtn'
          value='수정하기'
          onClick={updateMyInfo}
        />
      </div>
      <div>
        <input
          type='button'
          name='deletebtn'
          value='회원탈퇴'
          onClick={deleteUser}
        />
      </div>
    </div>
  );
};

export default UserMypageUpdate;