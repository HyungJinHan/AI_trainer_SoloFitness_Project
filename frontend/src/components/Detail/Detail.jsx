import React, { useEffect, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";
import Navigator from "../Navigator/Navigator";
import "../../styles/Detail/Detail.css";

const Detail = () => {
  const inputCountRef = useRef();
  const [inputCount, setInputCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const detailCategories = queryString.parse(location.search).exec;
  const [detailInfo, setDetailInfo] = useState([{
    "VIDEO_CATEGORY": "",
    "VIDEO_VIDEO_PREPARE": "",
    "VIDEO_INFO": "",
    "VIDEO_EFFECT": ""
  }])

  useEffect(() => {
    axios.post("http://localhost:8008/detail", { detailExec: detailCategories })
      .then((res) => {
        // console.log('detail(res)->', res);
        setDetailInfo(res.data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  return (
    <div>
      {/* 디테일 사항이 길어질 때 스크롤 만들기 위해 div로 감싸서 스타일 준 것 */}
      <div style={{height:"770px", overflowY:"scroll"}} >
        <img
          src={detailInfo[0].VIDEO_THUMBNAIL}
          alt="undefined"
          width='100%'
          height='50%'
        />
        <div style={{margin:"0 8px"}}>
          <p className="detail_exerName detail_text">{detailCategories}</p>
          <p>#{detailInfo[0].VIDEO_CATEGORY}</p>
          <div className="detail_exerstart">
            <input
              placeholder="운동 개수 지정"
              ref={inputCountRef}
              onChange={
                (e) => {
                  setInputCount(e.target.value);
                  axios
                    .post('http://localhost:8000/videoshutdown', {
                      count: parseInt(e.target.value)
                    })
                }
              }
            />
            <input
              type='button'
              value='운동 시작'
              onClick={
                () => {
                  if (inputCountRef.current.value === '' || inputCountRef.current.value === undefined) {
                    alert('운동 개수를 지정해주세요.');
                    return false;
                  } else {
                    navigate(`/video?exec=${detailCategories}`, { state: { inputCount: inputCount } })
                  }
                }
              }
            />
          </div>
          <p style={{ fontSize: "16px", color: "#3da2ff" }}>필요 준비물</p>
          {detailInfo[0].VIDEO_PREPARE}
          <p style={{ fontSize: "25px", color: "#3da2ff" }}>운동 소개</p>
          <p className="detail_text">{detailInfo[0].VIDEO_INFO}</p>
          <p style={{ fontSize: "25px", color: "#3da2ff" }}>운동 효과</p>
          {/* <p>{detailInfo[0].VIDEO_EFFECT}</p> */}
          <p className="detail_effect detail_text">{detailInfo[0].VIDEO_EFFECT.split("\\n").map((data) => 
                  {return <span>
                    {data}
                    <br/>
                  </span>})}</p>
          <p style={{ fontSize: "25px", color: "#3da2ff" }}>주의사항</p>
        </div>
      </div>
      <Navigator />
      <Outlet />
    </div>
  )
};

export default Detail;