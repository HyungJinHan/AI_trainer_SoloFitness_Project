import { useNavigate } from "react-router-dom";
import React from "react";
import "../../styles/Navigator/Navigator.css";
import home from "../../static/images/HHJ/Navigator/home_white.svg";
import rank from "../../static/images/HHJ/Navigator/rank_white.svg";
import search from "../../static/images/HHJ/Navigator/search_white.svg";
import user from "../../static/images/HHJ/Navigator/user_white.svg";
import nonMain from "../../static/images/JYY/ICON/home3.png";
import nonSearch from "../../static/images/JYY/ICON/search3.png";
import nonRank from "../../static/images/JYY/ICON/rank3.png";
import nonMy from "../../static/images/JYY/ICON/user3.png";
import yesMy from "../../static/images/JYY/ICON/user.png";
import styled from "styled-components";

const NavCenter = styled.div`
  text-align: center;
  padding-top: 5.625rem;
`;

// 새로고침하지 않아도 검색 아이콘 누르면 바로 다시 검색&카테고리 고를 수 있도록 CategoryNSearch에서 mode를 searchMode이름으로 받아옴
function NavigatorMain({ searchMode, setSearchMode, setMode }) {
  const navigate = useNavigate();

  return (
    <NavCenter>
      <div className="Navigator_bar">
        <div className="Navigator_div">
          <img
            className="Navigator_image"
            src={nonMain}
            alt="undefind"
            onClick={() => {
              navigate("/usermain");
            }}
          />
          <p className="Navigator_p">메인</p>
        </div>
        <div className="Navigator_div">
          <img
            className="Navigator_image"
            src={nonSearch}
            alt="undefind"
            onClick={() => {
              navigate("/category");
              if (searchMode === 1 || searchMode === 2) {
                setSearchMode(0);
              }
            }}
          />
          <p className="Navigator_p">검색</p>
        </div>
        <div className="Navigator_div">
          <img
            className="Navigator_image"
            src={nonRank}
            alt="undefind"
            onClick={() => {
              navigate("/challengerank");
              window.location.reload();
            }}
          />
          <p className="Navigator_p">랭킹</p>
        </div>
        <div className="Navigator_div">
          <img
            className="Navigator_image"
            src={yesMy}
            alt="undefind"
            onClick={() => {
              navigate("/usermypage");
              setMode(0);
            }}
          />
          <p className="Navigator_p_select">MY</p>
        </div>
      </div>
    </NavCenter>
  );
}

export default NavigatorMain;
