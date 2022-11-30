import { useNavigate } from "react-router-dom";
import React from "react";
import "../../styles/Navigator/Navigator.css";
import home from "../../static/images/HHJ/Navigator/home_white.svg";
import rank from "../../static/images/HHJ/Navigator/rank_white.svg";
import search from "../../static/images/HHJ/Navigator/search_white.svg";
import user from "../../static/images/HHJ/Navigator/user_white.svg";

// 새로고침하지 않아도 검색 아이콘 누르면 바로 다시 검색&카테고리 고를 수 있도록 CategoryNSearch에서 mode를 searchMode이름으로 받아옴
function Navigator({searchMode,setSearchMode}) {
  const navigate = useNavigate();

  return (
    <div className="Navigator_bar">
      <img
        className="Navigator_image"
        src={home}
        alt="undefind"
        onClick={() => {
          navigate("/usermain");
        }}
      />
      <img
        className="Navigator_image"
        src={search}
        alt="undefind"
        onClick={
          () => {
            navigate('/category');
            if (searchMode === 1 || searchMode === 2) {
              setSearchMode(0)
            }
          }
        }
      />
      <img
        className="Navigator_image"
        src={rank}
        alt="undefind"
        onClick={() => {
          navigate("/challengerank");
          window.location.reload();
        }}
      />
      <img
        className="Navigator_image"
        src={user}
        alt="undefind"
        onClick={() => {
          navigate("/usermypage");
        }}
      />
    </div>
  );
}

export default Navigator;
