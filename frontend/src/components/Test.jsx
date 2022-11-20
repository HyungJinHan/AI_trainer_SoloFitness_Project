import React from 'react';
import { useState } from 'react';
import axios from "axios";
import { useEffect } from 'react';

function Test(props) {
  const [test, setTest] = useState('');

  function getList() {
    axios
      .post("http://localhost:8008/hi", { id: 10 })
      .then((res) => {
        setTest(res.data);
      })
      .catch((e) => {
        console.error(e);
      });
  }

  useEffect(() => {
    getList()
  }, [test])

  console.log(test)

  return (
    <div>
      <h1>Hello, World!</h1>
      <h3>{test}</h3>
    </div>
  );
}

export default Test;