import axios from "axios";
import { useState, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import MainSliderTheme from "../MainSlider/MainSliderTheme";
import Navigator from "../Navigator/Navigator";

const MainCenter = styled.div`
    text-align: center;
    padding-top: 3.125rem;
    padding-bottom: 6.25rem;
  `;

function UserPageMain(props) {
  const navigate = useNavigate();

  if (window.sessionStorage.userID === '' || window.sessionStorage.userID === undefined) {
    alert(`로그인 후 이용 가능합니다.
로그인 페이지로 이동합니다.`);
    navigate('/');
    return false;
  }

  return (
    <MainCenter>
      <MainSliderTheme />
      {/* <input
        type="button"
        value="Go To Chat"
        onClick={() => {
          navigate("/chatjoin");
        }}
      />
      <br />
      <br /> */}
      <Navigator />
      <Outlet />
    </MainCenter>
  );
}

export default UserPageMain;
