import React, { useEffect } from 'react';
import { useState } from 'react';
import Register from './components/Register';
import { Routes, Route } from "react-router-dom";
import ModelSelect from "./components/AI/ModelSelect";

const App = () => {
  const [message, setMessage] = useState('');

  const getWelcomeMessage = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const response = await fetch('http://localhost:8000/api', requestOptions);
    const data = await response.json();

    if (!response.ok) {
      console.log('Something Messed Up');
    } else {
      setMessage(data.message);
    }
  };

  useEffect(() => {
    getWelcomeMessage();
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/video" element={<ModelSelect />} />
      </Routes>
    </div>
  );
}

export default App;
