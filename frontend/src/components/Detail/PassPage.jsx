import React from "react";
import { useNavigate,useLocation } from "react-router-dom";
import Detail from "./Detail";

const Pass = () => {
  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname === "/detail") {
    return (
      <Detail />
    )
  }
};

export default Pass;
