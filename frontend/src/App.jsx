import React, { useEffect } from 'react';
import { useState } from 'react';
import Register from './components/Register';

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
      <Register />
    </div>
  );
}

export default App;
