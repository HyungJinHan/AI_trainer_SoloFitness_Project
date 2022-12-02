import React from "react";
import "../../styles/AdminPage/AdminPageUser.css";
import AdminPageMain from "./AdminPageMain";
import AdminPageUserNivo from "./AdminPageUserNivo";
import AdminPageUserNivo_A from "./AdminPageUserNivo_A";

const AdminPageUser = () => {
  return (
    <div className="AdminPageUser_top_div">
      <div className="AdminPageUser_sidebar">
        <AdminPageMain />
      </div>
      <div className="AdminPageUser_user_main_gender">
        <div className="AdminPageUser_user_gender_main">
          <div className="AdminPageUser_user_gender_nivo_text">남녀비율</div>
          <AdminPageUserNivo />
        </div>
      </div>
      <div className="AdminPageUser_user_main_age">
        <div className="AdminPageUser_user_age_main">
          <div className="AdminPageUser_user_age_nivo_text">회원 나이 분포</div>
          <AdminPageUserNivo />
        </div>
      </div>
    </div>
  );
};

export default AdminPageUser;