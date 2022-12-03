import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import MainSliderEvent from "../MainSlider/MainSliderEvent";
import MainSliderTheme from "../MainSlider/MainSliderTheme";
import Navigator from "../Navigator/Navigator";
import '../../styles/UserPage/UserPage.css'
import { useEffect, useState } from "react";
import axios from "axios";
import KakaoMapContainer from '../KakaoMap/KakaoMapContainer'
import MainSliderCenter from "../MainSlider/MainSliderCenter";

const MainCenter = styled.div`
  text-align: center;
  padding-top: 3.125rem;
  /* padding-bottom: 6.25rem; */
`;

function UserPageMain(props) {
  const navigate = useNavigate();
  const [centerInfos, setCenterInfos] = useState([]);
  const [codeInfo, setCodeInfo] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:8008/maincenterinfo", {
        USER_ID: window.sessionStorage.getItem('userID'),
      })
      .then((res) => {
        setCenterInfos(res.data[0]);
      })
      .catch((e) => {
        console.log(e);
      });

    axios
      .post("http://localhost:8008/codeinfo", {
        USER_ID: window.sessionStorage.getItem('userID'),
      })
      .then((res) => {
        setCodeInfo(res.data[0]);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [])

  console.log(centerInfos.CENTER_ADRESS);
  console.log(codeInfo);

  if (window.sessionStorage.userID === '' || window.sessionStorage.userID === undefined) {
    alert(`로그인 후 이용 가능합니다.
로그인 페이지로 이동합니다.`);
    navigate("/");
    return false;
  }

  return (
    <MainCenter>
      {
        codeInfo.USER_ACCESS_CODE === '' ?
          null
          :
          <div className="UserMain_center">
            <div>
              <div className="UserMain_centerTitle">
                {centerInfos.CENTER_NAME} 센터의 회원으로
                <br />
                등록 중 입니다!
              </div>
              <div className="UserMain_centerMap">
                <KakaoMapContainer
                  center_address={centerInfos.CENTER_ADRESS}
                  id={centerInfos.CENTER_ID}
                />
              </div>
              <br />
              <hr />
              <div className="UserMain_centerContents">
                {centerInfos.CENTER_NAME} 센터의 콘텐츠를 즐겨보세요!
              </div>
              <MainSliderCenter
                CENTER_ID={centerInfos.CENTER_ID}
              />
            </div>
          </div>
      }
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
