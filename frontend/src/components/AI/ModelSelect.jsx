import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios'

const ModelSelect = () => {
  const [counter, setCounter] = useState(0)
  useEffect(() => {
    axios
    .get('http://localhost:8000/initialization')
    .then((res) => {
      setCounter(res.data)
      console.log('initial:',counter)
    })
  },[])
  setInterval(() => {
    axios
      .get("http://localhost:8000/videocount")
      .then((res) => {
        var countlist = res.data
        setCounter(countlist[countlist.length-1])
      })
      .catch((e) => {
        console.error(e);
      });
  },1000);
  return (
    <div>
      <div>
      <img src="http://localhost:8000/video" alt="Video" />
      </div>
      {counter}
    </div>
  );
};

export default ModelSelect;
