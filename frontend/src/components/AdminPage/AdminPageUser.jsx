import React from "react";
import "../../styles/AdminPage/AdminPageUser.css";
import AdminPageMain from "./AdminPageMain";
import AdminPageUserNivo from "./AdminPageUserNivo";
import AdminPageUserNivo_A from "./AdminPageUserNivo_A";
import AdminPageUserNivo_C from "./AdminPageUserNivo_C";
import AdminPageUserNivo_E from "./AdminPageUserNivo_E";

const AdminPageUser = () => {
  return (
    <div className="AdminPageUser_top_div">
      <div className="AdminPageUser_sidebar">
        <AdminPageMain />
      </div>
      <div>
        <div className="AdminPageUser_user_gender_main">
          <div className="AdminPageUser_user_gender_nivo_text">남녀비율</div>
          <AdminPageUserNivo />
        </div>
        <div className="AdminPageUser_user_age_main">
          <div className="AdminPageUser_user_age_nivo_text">회원 나이 분포</div>
          <AdminPageUserNivo_A />
        </div>
        <div className="AdminPageUser_user_center_main">
          <div className="AdminPageUser_user_center_nivo_text">
            센터 등록 회원
          </div>
          <AdminPageUserNivo_C />
        </div>
        <div className="AdminPageUser_user_excercise_main">
          <div className="AdminPageUser_user_excercise_nivo_text">
            회원 선호 운동
          </div>
          <AdminPageUserNivo_E />
        </div>
      </div>
    </div>
  );
};

export default AdminPageUser;
