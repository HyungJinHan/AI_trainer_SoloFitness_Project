import React from "react";
import { Routes, Route } from "react-router-dom";
import ModelSelect from "./components/AI/AIModelSelect";
import UserPageMain from "./components/UserPage/UserPageMain";
import Chat from "./components/Chat/Chat";
import ChatJoin from "./components/Chat/ChatJoin";
import FitnessResult from "./components/AI/AIFitnessResult";
import FitnessResultNivo from "./components/AI/AIFitnessResultNivo";
import UserLogin from "./components/UserLogin/UserLogin";
import RegisterMain from "./components/UserRegister/UserRegisterMain";
import CenterRegisterMain from "./components/CenterRegister/CenterRegisterMain";
import CenterLogin from "./components/CenterLogin/CenterLogin";
import AIModelSelect_C from "./components/AI/AIModelSelect_C";
import Category from "./components/Search/CategoryNSearch";
import Detail from "./components/Detail/Detail";
import CenterMain from "./components/CenterPage/CenterMain";
import Navigator from "./components/Navigator/Navigator";
import ChallengeMain from "./components/Challenge/ChallengeMain";
import CategoryList from "./components/Search/CategoryList";
import LoadingSpinner from "./components/Loading/LoadingSpinner";
import UserMypageMain from "./components/UserMypage/UserMypageMain";
import NavigatorTop from "./components/Navigator/NavigatorTop";
import MainSliderTheme from "./components/MainSlider/MainSliderTheme";
import MainSliderLeg from "./components/MainSlider/MainSliderLeg";

const App = () => {
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
        <Route path="/navigatortop" element={<NavigatorTop />} />
        {/** 카테고리 리스트 */}
        <Route path="/categorylist" element={<CategoryList />} />
        {/** 운동 결과 로딩창 */}
        <Route path="/loading" element={<LoadingSpinner />} />
        {/** 유저 마이페이지 */}
        <Route path="/usermypage" element={<UserMypageMain />} />
        {/** 테마 슬라이더 */}
        <Route path="/mainslidertheme" element={<MainSliderTheme />} />
        <Route path="/mainsliderlist" element={<MainSliderLeg />} />
      </Routes>
    </div>
  );
};

export default App;
