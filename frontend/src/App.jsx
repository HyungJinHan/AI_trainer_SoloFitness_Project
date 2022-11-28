import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ModelSelect from "./components/AI/AIModelSelect";
import Test from "./components/Test";
import Chat from "./components/Chat/Chat";
import ChatJoin from "./components/Chat/ChatJoin";
import FitnessResult from "./components/AI/AIFitnessResult";
import FitnessResultNivo from "./components/AI/AIFitnessResultNivo";
import UserLogin from "./components/UserLogin/UserLogin";
// import Join from "./components/Join/Join";
import RegisterMain from "./components/Register/RegisterMain";
import CenterRegisterMain from "./components/CenterRegister/CenterRegisterMain";
import CenterLogin from "./components/CenterLogin/CenterLogin";
// import AIModelSelect_C from "./components/AI/AIModelSelect_C";
import Category from "./components/Search/CategoryNSearch";
// import Detail from "./components/Detail/Detail";
import Pass from "./components/Detail/PassPage";

const App = () => {
  const AIModelSelect_C = React.lazy(() =>
    import("./components/AI/AIModelSelect_C")
  );
  return (
    <div>
      <Suspense fallback={<div>로딩중</div>}>
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
          {/**운동 모델 챌린지용 */}
          <Route path="/videoc" element={<AIModelSelect_C />} />
          {/* 검색 */}
          <Route path="/Category" element={<Category />} />
          {/* 운동 디테일 페이지 */}
          <Route path="/detail" element={<Pass />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
