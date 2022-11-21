import React from 'react';
import { Routes, Route } from "react-router-dom";
// import ModelSelect from './components/AI/ModelSelect';
import Test from './components/Test';

const App = () => {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Test />} />
        {/* <Route path='/video' element={<ModelSelect />} /> */}
      </Routes>
    </div>
  );
}

export default App;