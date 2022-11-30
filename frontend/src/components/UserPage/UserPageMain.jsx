import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import MainSliderEvent from "../MainSlider/MainSliderEvent";
import MainSliderTheme from "../MainSlider/MainSliderTheme";
import Navigator from "../Navigator/Navigator";
import '../../styles/UserPage/UserPage.css'

const MainCenter = styled.div`
  text-align: center;
  padding-top: 3.125rem;
  /* padding-bottom: 6.25rem; */
`;

function UserPageMain(props) {
  const navigate = useNavigate();

  if (window.sessionStorage.userID === '' || window.sessionStorage.userID === undefined) {
    alert(`로그인 후 이용 가능합니다.
로그인 페이지로 이동합니다.`);
    navigate("/");
    return false;
  }

  return (
    <MainCenter>
      <div className='UserMain_white'>
        <MainSliderTheme />
      </div>
      <div className='UserMain_gray'>
        <MainSliderEvent />
      </div>
      <Navigator />
      <Outlet />
    </MainCenter>
  );
}

export default UserPageMain;
