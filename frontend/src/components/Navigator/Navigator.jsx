import { useNavigate } from "react-router-dom";
import React from "react";
import "../../styles/Navigator/Navigator.css";
import home from "../../static/images/HHJ/Navigator/home_white.svg";
import rank from "../../static/images/HHJ/Navigator/rank_white.svg";
import search from "../../static/images/HHJ/Navigator/search_white.svg";
import user from "../../static/images/HHJ/Navigator/user_white.svg";

function Navigator(props) {
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
        onClick={() => {
          navigate("/category");
        }}
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
