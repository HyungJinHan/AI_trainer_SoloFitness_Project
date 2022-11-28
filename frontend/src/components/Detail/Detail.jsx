import React, {useEffect,useState} from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";

const Detail = () => {
  const location = useLocation();
  const detailCategories = queryString.parse(location.search).exec;
  // 쿼리파라미터를 exec로 똑같이 하면 충돌?
  const [detailInfo, setDetailInfo] = useState([{
    "VIDEO_CATEGORY":"",
    "VIDEO_VIDEO_PREPARE":"",
    "VIDEO_INFO":"",
    "VIDEO_EFFECT":""
  }])

  useEffect(() => {
    axios.post("http://localhost:8008/detail",{detailExec:detailCategories})
    .then((res) => {
      console.log('detail(res)->',res);
      setDetailInfo(res.data);
    })
    .catch((e) => {
      console.error(e);
    });
  }, []);

  return (
    <div>
      backgrounImage 넣고 <br />
      {detailCategories} <br /><br />
      <p>{detailInfo[0].VIDEO_CATEGORY}
      &nbsp; &nbsp; &nbsp;
      <input type="button" value="운동 시작" /></p>

      <br />
      <p style={{fontSize:"25px", color:"blue"}}>운동 준비물</p>
      {detailInfo[0].VIDEO_PREPARE}
      <p style={{fontSize:"25px", color:"blue"}}>운동 소개</p>
      {detailInfo[0].VIDEO_INFO}
      <p style={{fontSize:"25px", color:"blue"}}>운동 효과</p>
      {detailInfo[0].VIDEO_EFFECT}
      <p style={{fontSize:"25px", color:"blue"}}>주의사항</p>
    </div>
  )
};

export default Detail;