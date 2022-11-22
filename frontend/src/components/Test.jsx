import React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Test(props) {
  const [test, setTest] = useState('hi');
  const navigate = useNavigate();

  function getList() {
    axios
      .post("http://localhost:8008/hi")
      .then((res) => {
        setTest(res.data[0].email);
        // console.log(res.data);
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
      {test}
      <br /><br /><br />
      <input
        type="button"
        value='Go To Video'
        onClick={() => {
          navigate('/video');
        }}
      />
      &nbsp;&nbsp;
      <input
        type="button"
        value='Go To Chat'
        onClick={() => {
          navigate('/chatjoin');
        }}
      />
    </div>
  );
}

export default Test;