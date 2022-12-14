import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/AdminPage/AdminPageMain.css";
import user from "../../static/images/KCJ/icons/user.png";
import chat from "../../static/images/KCJ/icons/bubble-chat.png";
import logout from "../../static/images/KCJ/icons/power-off.png";
import admin from "../../static/images/KCJ/icons/admin.png";
import weight from "../../static/images/KCJ/icons/weight.png";

const AdminPageMain = () => {
  const navigator = useNavigate();
  const [expended, setExpended] = useState(true);
  const [adminName, setAdminName] = useState("김찬진");
  const [adminJob, setAdminJob] = useState("AI 관리자");
  const menuItems = [
    {
      text: "회원관리",
      icons: user,
      url: "adminuser",
    },
    {
      text: "센터관리",
      icons: weight,
      url: "admincenter",
    },
    {
      text: "관리자 채팅",
      icons: chat,
      url: "adminchat",
    },
  ];
  useEffect(() => {
    if (window.sessionStorage.getItem("adminID") === "admin_hhj") {
      setAdminName("한형진");
      setAdminJob("총 관리자");
    } else if (window.sessionStorage.getItem("adminID") === "admin_jyy") {
      setAdminName("정영윤");
      setAdminJob("프론트 관리자");
    } else if (window.sessionStorage.getItem("adminID") === "admin_kcj") {
      setAdminName("김찬진");
      setAdminJob("AI 관리자");
    } else if (window.sessionStorage.getItem("adminID") === "admin_ljj") {
      setAdminName("이진주");
      setAdminJob("AI 관리자");
    } else if (window.sessionStorage.getItem("adminID") === "admin_hhh") {
      setAdminName("홍현호");
      setAdminJob("DB 관리자");
    }
  });

  const logoutFunc = () => {
    alert("로그아웃 되었습니다.");
    window.sessionStorage.removeItem("adminID");
    navigator("/");
  };
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
              onClick={() => {
                navigator(`/${item.url}`);
              }}
            >
              <img src={item.icons} />
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
            <img src={admin} className="AdminPageMain_menu_nav_footer_img"></img>
            <div className="AdminPageMain_menu_nav_footer_info">
              <p className="AdminPageMain_menu_nav_footer_user_name">
                {adminName}
              </p>
              <p className="AdminPageMain_menu_nav_footer_user_position">
                {adminJob}
              </p>
            </div>
          </div>
        )}
        <img
          src={logout}
          onClick={logoutFunc}
          className="AdminPageMain_menu_log_out"
        ></img>
      </div>
      <div></div>
    </div>
  );
};

export default AdminPageMain;
