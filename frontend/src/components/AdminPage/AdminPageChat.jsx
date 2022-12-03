import React from "react";
import ChatJoin from "../Chat/ChatJoin";
import AdminPageMain from "./AdminPageMain";
import "../../styles/AdminPage/AdminPageChat.css";

const AdminPageChat = () => {
  return (
    <div className="AdminPageChat_top_div">
      <div className="AdminPageChat_sidebar">
        <AdminPageMain />
      </div>
      <div className="AdminPageChat_Chat">
        <ChatJoin />
      </div>
    </div>
  );
};

export default AdminPageChat;
