import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ModelSelect from "./components/AI/ModelSelect";
import Test from "./components/Test";
import Chat from "./components/Chat/Chat";
import ChatJoin from "./components/Chat/ChatJoin";
import FitnessResult from "./components/AI/FitnessResult";
import FitnessResultNivo from "./components/AI/FitnessResultNivo";
import Login from "./components/Login/Login";
// import Join from "./components/Join/Join";
import RegisterMain from "./components/Register/RegisterMain";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Test />} />
        <Route path="/userlogin" element={<Login />} />
        <Route path="/userjoin" element={<RegisterMain />} />
        <Route path="/video" element={<ModelSelect />} />
        <Route path="/chatjoin" element={<ChatJoin />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/fitnessresult" element={<FitnessResult />} />
        <Route path="/nivotest" element={<FitnessResultNivo />} />
      </Routes>
    </div>
  );
};

export default App;
