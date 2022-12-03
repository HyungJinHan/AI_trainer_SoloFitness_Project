import React from "react";
import "../../styles/AdminPage/AdminPageCenter.css";
import AdminPageMain from "./AdminPageMain";

const AdminPageCenter = () => {
  return (
    <div className="AdminPageCenter_top_div">
      <div className="AdminPageCenter_sidebar">
        <AdminPageMain />
      </div>
      <div></div>
    </div>
  );
};

export default AdminPageCenter;
