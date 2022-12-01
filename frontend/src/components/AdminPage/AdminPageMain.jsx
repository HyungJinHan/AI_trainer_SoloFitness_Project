import React, { useState } from "react";
import "../../styles/AdminPage/AdminPageMain.css";

const AdminPageMain = () => {
  const [expended, setExpended] = useState(false);
  const menuItems = [
    {
      text: "유저정보",
      icons: "",
    },
    {
      text: "Front-end setting",
      icons: "",
    },
    {
      text: "Back-end setting",
      icons: "",
    },
    {
      text: "AI setting",
      icons: "",
    },
    {
      text: "관리자 채팅",
      icons: "",
    },
  ];
  return (
    <div className="AdminPageMain_top_div">
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
                <h2 className="AdminPageMain_nav_brand_text">Wanted</h2>
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
            {menuItems.map(({ text, icons }) => (
              <a
                href="#"
                className={
                  expended
                    ? "AdminPageMain_menu_item"
                    : "AdminPageMain_menu_item AdminPageMain_menu_item_NX"
                }
              >
                <img src={icons} />
                {expended && <p>{text}</p>}
                {!expended && (
                  <div className="AdminPageMain_menu_tooltip">{text}</div>
                )}
              </a>
            ))}
          </div>
        </div>
        <div className="AdminPageMain_menu_nav_footer">
          {expended && (
            <div className="AdminPageMain_menu_nav_details">
              <img src="어드민아이콘"></img>
              <div className="AdminPageMain_menu_nav_footer_info">
                <p className="AdminPageMain_menu_nav_footer_user_name">
                  김찬진
                </p>
                <p className="AdminPageMain_menu_nav_footer_user_position">
                  AI 관리자
                </p>
              </div>
            </div>
          )}
          <img
            src="로그아웃아이콘"
            className="AdminPageMain_menu_log_out"
          ></img>
        </div>
      </div>
    </div>
  );
};

export default AdminPageMain;
