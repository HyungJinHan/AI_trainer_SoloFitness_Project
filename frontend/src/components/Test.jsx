import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const MainCenter = styled.div`
    text-align: center;
    padding-top: 3.125rem;
  `;

function Test(props) {
  const inputCountRef = useRef();
  const [inputCount, setInputCount] = useState(0);
  const adminRef = useRef();
  const navigate = useNavigate();

  console.log(inputCount)

  return (
    <MainCenter>
      <input
        type="button"
        value="Go To Chat"
        onClick={() => {
          navigate("/chatjoin");
        }}
      />
      &nbsp;&nbsp;
      <input
        type="button"
        value="search"
        onClick={() => {
          navigate("/Category");
        }}
      />
      <br />
      <br />
      <br />
      <input
        type="button"
        value="유저 로그인"
        onClick={() => {
          navigate("/userlogin");
        }}
      />
      &nbsp;&nbsp;
      <input
        type="button"
        value="유저 회원가입"
        onClick={() => {
          navigate("/userjoin");
        }}
      />
      <br />
      <br />
      <br />
      <input
        type="button"
        value="센터 로그인"
        onClick={() => {
          navigate("/centerlogin");
        }}
      />
      &nbsp;&nbsp;
      <input
        type="button"
        value="센터 회원가입"
        onClick={() => {
          navigate("/centerjoin");
        }}
      />
      <br />
      <br />
      <br />
      <input
        placeholder="운동 갯수 지정"
        onChange={
          (e) => {
            setInputCount(e.target.value);
          }
        }
      />
      <br />
      <br />
      <Link to={'/video?exec=squat'} state={{ inputCount: inputCount }}>
        <input
          type='button'
          value='스쿼트'
          ref={inputCountRef}
        />
      </Link>
      &nbsp;&nbsp;
      <a href="/video?exec=pullup">풀업</a>
      &nbsp;&nbsp;
      <a href="/video?exec=pushup">푸쉬업</a>
      &nbsp;&nbsp;
      <a href="/video?exec=situp">싯업</a>
      &nbsp;&nbsp;
      <a href="/video?exec=curl">덤벨컬</a>
      &nbsp;&nbsp;
      <br />
      <br />
      <br />
      <a href="/videoc?exec=squat">스쿼트챌린지</a>
      &nbsp;&nbsp;
      <a href="/videoc?exec=pullup">풀업챌린지</a>
      &nbsp;&nbsp;
      <a href="/videoc?exec=pushup">푸쉬업챌린지</a>
      &nbsp;&nbsp;
      <a href="/videoc?exec=situp">싯업챌린지</a>
      &nbsp;&nbsp;
      <a href="/videoc?exec=curl">덤벨컬챌린지</a>
      &nbsp;&nbsp;
    </MainCenter>
  );
}

export default Test;
