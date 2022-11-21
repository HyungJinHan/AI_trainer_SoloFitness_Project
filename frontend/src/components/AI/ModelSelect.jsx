import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios'

const ModelSelect = () => {
  const [counter, setCounter] = useState(123)
  setInterval(() => {
    axios
      .post("http://localhost:8000/videocount")
      .then((res) => {
        var arr1 = res.data
        setCounter(arr1[arr1.length-1])
      })
      .catch((e) => {
        console.error(e);
      });
  },500);
  console.log(counter)
  return (
    <div>
      <img src="http://localhost:8000/video" alt="Video" />
      <br/>
      {counter}
    </div>
  );
};

export default ModelSelect;
