import React, { useRef } from 'react';

function Join(props) {

  return (
    <div>
      <input
        type="text"
        placeholder="아이디를 입력하세요."
      />
      <br/><br/><br/>
      <input
        type="password"
        placeholder="비밀번호를 입력하세요."
      />
      <br/><br/><br/>
      <input
        type="password"
        placeholder="비밀번호를 확인해주세요."
      />
      <br/><br/><br/>
      <input
        type="text"
        placeholder="이름을 입력하세요."
      />
      <br/><br/><br/>
      <input
        type="text"
        placeholder="닉네임을 입력하세요."
      />
      <br/><br/><br/>
      <input
        type="text"
        placeholder="이메일을 입력하세요."
      />@
      <select>
        <option>이메일을 선택하세요.</option>
        <option>naver.com</option>
        <option>daum.net</option>
        <option>gmail.com</option>
      </select>
      <br/><br/><br/>
      <input
        type="text"
        placeholder="주소를 입력하세요."
      />
      <br/><br/><br/>
      <input
        type="tel"
        placeholder="전화번호를 입력하세요."
      />
    </div>
  );
}

export default Join;