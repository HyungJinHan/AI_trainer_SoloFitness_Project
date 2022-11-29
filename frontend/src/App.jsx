import React from "react";
import { Routes, Route } from "react-router-dom";
import ModelSelect from "./components/AI/AIModelSelect";
import UserPageMain from "./components/UserPage/UserPageMain";
import Chat from "./components/Chat/Chat";
import ChatJoin from "./components/Chat/ChatJoin";
import FitnessResult from "./components/AI/AIFitnessResult";
import FitnessResultNivo from "./components/AI/AIFitnessResultNivo";
import UserLogin from "./components/UserLogin/UserLogin";
// import Join from "./components/Join/Join";
import RegisterMain from "./components/UserRegister/UserRegisterMain";
import CenterRegisterMain from "./components/CenterRegister/CenterRegisterMain";
import CenterLogin from "./components/CenterLogin/CenterLogin";
// import AIModelSelect_C from "./components/AI/AIModelSelect_C";
import Category from "./components/Search/CategoryNSearch";
import Detail from "./components/Detail/Detail";
import CenterMain from "./components/CenterPage/CenterMain";
import Navigator from "./components/Navigator/Navigator";
import ChallengeMain from "./components/Challenge/ChallengeMain";
import CategoryList from "./components/Search/CategoryList";

const App = () => {
  const AIModelSelect_C = React.lazy(() =>
    import("./components/AI/AIModelSelect_C")
  );

  return (
    <div>
      <Routes>
        {/** 메인 화면 */}
        <Route path="/usermain" element={<UserPageMain />} />
        {/** 유저 로그인, 회원가입 */}
        <Route path="/" element={<UserLogin />} />
        <Route path="/userjoin" element={<RegisterMain />} />
        {/** 센터 로그인, 회원가입 */}
        <Route path="/centerlogin" element={<CenterLogin />} />
        <Route path="/centerjoin" element={<CenterRegisterMain />} />
        {/** 센터 페이지 */}
        <Route path="/centermain" element={<CenterMain />} />
        {/** 운동 모델 */}
        <Route path="/video" element={<ModelSelect />} />
        {/** 채팅 */}
        <Route path="/chatjoin" element={<ChatJoin />} />
        <Route path="/chat" element={<Chat />} />
        {/** 운동 결과 */}
        <Route path="/fitnessresult" element={<FitnessResult />} />
        <Route path="/nivotest" element={<FitnessResultNivo />} />
        {/** 챌린지 페이지 */}
        <Route path="/challenge" element={<ChallengeMain />} />
        {/** 운동 모델 챌린지용 */}
        <Route path="/videoc" element={<AIModelSelect_C />} />
        {/** 검색 */}
        <Route path="/category" element={<Category />} />
        {/** 운동 디테일 페이지 */}
        <Route path="/detail" element={<Detail />} />
        {/** 네이게이션 바 */}
        <Route path="/navigator" element={<Navigator />} />
        {/** 카테고리 리스트 */}
        <Route path="/categorylist" element={<CategoryList />} />
      </Routes>
    </div>
  );
};

export default App;
