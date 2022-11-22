import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const ModelSelect = () => {
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    axios
      .get('http://localhost:8000/initialization')
      .then((res) => {
        setCounter(res.data)
        console.log('initial:', counter)
      })
  }, [])

  setInterval(() => {
    axios
      .get("http://localhost:8000/videocount")
      .then((res) => {
        var countlist = res.data
        setCounter(countlist[countlist.length - 1])
      })
      .catch((e) => {
        console.error(e);
      });
  }, 500);

  console.log(counter)

  return (
    <div>
      <div>
        <img src="http://localhost:8000/video" alt="Video" />
      </div>
      {counter}
      <br /><br /><br />
      <a type="button" href='http://localhost:3000'>Back To Main</a>
    </div>
  );
};

export default ModelSelect;
