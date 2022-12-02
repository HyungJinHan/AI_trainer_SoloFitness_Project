import React, { useState } from "react";
import "../../styles/AdminPage/AdminPageMain.css";
import user from "../../static/images/KCJ/icons/user.png";
import front from "../../static/images/KCJ/icons/ux-design.png";
import back from "../../static/images/KCJ/icons/backend.png";
import ai_img from "../../static/images/KCJ/icons/ai.png";
import chat from "../../static/images/KCJ/icons/bubble-chat.png";
import logout from "../../static/images/KCJ/icons/power-off.png";
import admin from "../../static/images/KCJ/icons/admin.png";

const AdminPageMain = () => {
  const [expended, setExpended] = useState(true);
  const menuItems = [
    {
      text: "유저정보",
      icons: user,
    },
    {
      text: "Front-end setting",
      icons: front,
    },
    {
      text: "Back-end setting",
      icons: back,
    },
    {
      text: "AI setting",
      icons: ai_img,
    },
    {
      text: "관리자 채팅",
      icons: chat,
    },
  ];
  return (
    <div
      className={
        expended
          ? "AdminPageMain_side_nav_container"
          : "AdminPageMain_side_nav_container AdminPageMain_side_nav_container_NX"
      }
    >
      <div className="AdminPageMain_nav_upper">
        <div className="AdminPageMain_nav_heading">
          {expended && (
            <div className="AdminPageMain_nav_brand">
              {/* 이 자리에 로고이미지 */}
              <h2 className="AdminPageMain_nav_brand_text">@Wanted</h2>
            </div>
          )}
          <button
            className={
              expended
                ? "AdminPageMain_button AdminPageMain_button_in"
                : "AdminPageMain_button AdminPageMain_button_out"
            }
            onClick={() => setExpended(!expended)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        <div className="AdminPageMain_nav_manu">
          {menuItems.map((item) => (
            <div
              className={
                expended
                  ? "AdminPageMain_menu_item"
                  : "AdminPageMain_menu_item AdminPageMain_menu_item_NX"
              }
            >
              <img src={item.icons} alt="왜안뜸?" />
              {expended && <p>{item.text}</p>}
              {!expended && (
                <div className="AdminPageMain_menu_tooltip">{item.text}</div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="AdminPageMain_menu_nav_footer">
        {expended && (
          <div className="AdminPageMain_menu_nav_details">
            <img src={admin}></img>
            <div className="AdminPageMain_menu_nav_footer_info">
              <p className="AdminPageMain_menu_nav_footer_user_name">김찬진</p>
              <p className="AdminPageMain_menu_nav_footer_user_position">
                AI 관리자
              </p>
            </div>
          </div>
        )}
        <img src={logout} className="AdminPageMain_menu_log_out"></img>
      </div>
      <div></div>
    </div>
  );
};

export default AdminPageMain;
