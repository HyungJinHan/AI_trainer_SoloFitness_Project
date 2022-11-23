import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ModelSelect from "./components/AI/ModelSelect";
import Test from "./components/Test";
import Chat from "./components/ChatComponents/Chat/Chat";
import Join from "./components/ChatComponents/Join/Join";
import FitnessResult from "./components/AI/FitnessResult";
import FitnessResultNivo from "./components/AI/FitnessResultNivo";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Test />} />
        <Route path="/video" element={<ModelSelect />} />
        <Route path="/chatjoin" element={<Join />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/fitnessresult" element={<FitnessResult />} />
        <Route path="/nivotest" element={<FitnessResultNivo />} />
      </Routes>
    </div>
  );
};

export default App;
