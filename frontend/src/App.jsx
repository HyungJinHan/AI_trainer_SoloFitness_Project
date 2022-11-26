import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ModelSelect from "./components/AI/ModelSelect";
import Test from "./components/Test";
import Chat from "./components/Chat/Chat";
import ChatJoin from "./components/Chat/ChatJoin";
import FitnessResult from "./components/AI/FitnessResult";
import FitnessResultNivo from "./components/AI/FitnessResultNivo";
import UserLogin from "./components/UserLogin/UserLogin";
// import Join from "./components/Join/Join";
import RegisterMain from "./components/Register/RegisterMain";
import CenterRegisterMain from "./components/CenterRegister/CenterRegisterMain";
import CenterLogin from "./components/CenterLogin/CenterLogin";

const App = () => {
  return (
    <div>
      <Routes>
        {/** 메인 화면 */}
        <Route path="/" element={<Test />} />
        {/** 유저 로그인, 회원가입 */}
        <Route path="/userlogin" element={<UserLogin />} />
        <Route path="/userjoin" element={<RegisterMain />} />
        {/** 센터 로그인, 회원가입 */}
        <Route path="/centerlogin" element={<CenterLogin />} />
        <Route path="/centerjoin" element={<CenterRegisterMain />} />
        {/** 운동 모델 */}
        <Route path="/video" element={<ModelSelect />} />
        {/** 채팅 */}
        <Route path="/chatjoin" element={<ChatJoin />} />
        <Route path="/chat" element={<Chat />} />
        {/** 운동 결과 */}
        <Route path="/fitnessresult" element={<FitnessResult />} />
        <Route path="/nivotest" element={<FitnessResultNivo />} />
      </Routes>
    </div>
  );
};

export default App;
