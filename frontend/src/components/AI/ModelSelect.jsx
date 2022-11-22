import React from "react";
import { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const ModelSelect = () => {
  const [counter, setCounter] = useState(0)

  setInterval(() => {
    axios
      .post("http://localhost:8000/videocount")
      .then((res) => {
        var arr1 = res.data
        setCounter(arr1[arr1.length - 1])
      })
      .catch((e) => {
        console.error(e);
      });
  }, 500);

  console.log(counter)

  return (
    <div>
      <img src="http://localhost:8000/video" alt="Video" />
      <br />
      {counter}
      <br /><br /><br />
      <a type="button" href='http://localhost:3000'>Back To Main</a>
    </div>
  );
};

export default ModelSelect;
