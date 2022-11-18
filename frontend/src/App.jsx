import React from 'react';
import { Routes, Route } from "react-router-dom";
import ModelSelect from './components/AI/ModelSelect';

const App = () => {

  return (
    <div>
      <Routes>
        <Route path='/' element={<ModelSelect />} />
      </Routes>
    </div>
  );
}

export default App;
