import React, { useEffect, useState } from "react";
import queryString from 'query-string';
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ReactPlayer from 'react-player';
import NavigatorMain from "../Navigator/NavigatorMain";
import { Outlet } from "react-router-dom";
import "../../styles/Detail/Detail.css";

const CenterDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const userSession = window.sessionStorage.getItem("userID");
  // const centerExec = queryString.parse(location.search).exec;
  const [detailInfo, setDetailInfo] = useState([{
    "CT_VIDEO_TITLE": "",
    "CT_VIDEO_CATEGORY": "",
    "CT_VIDEO_INFO": "",
    "CT_VIDEO_BODY_PART": "",
    "CT_VIDEO_EFFECT": "",
    "CT_VIDEO_PREPARE": ""
  }])

  useEffect(() => {
    axios.post("http://localhost:8008/centerdetail", {
      centerExec: queryString.parse(location.search).exec
    }).then((res) => {
      // console.log("CenterDetail(res)->",res);
      setDetailInfo(res.data);
    }).catch((e) => {
      console.error(e);
    })
  }, []);

  return (
    <div className="detail_main">
      <ReactPlayer
        className='CenterDetail_video'
        url={detailInfo[0].CT_VIDEO_ADDRESS}
        controls
        width={'100%'}
      // height={'50%'}
      />
      <div className="detail_center_title">{detailInfo[0].CT_VIDEO_TITLE}</div>
      <div className="detail_center_category"># {detailInfo[0].CT_VIDEO_CATEGORY}</div>

      <hr />
      <div className="detail_prepare">운동부위</div>
      <div className="detail_article">{detailInfo[0].CT_VIDEO_BODY_PART}</div>
      <br />
      <hr />
      <div className="detail_prepare">필요 준비물</div>
      <div className="detail_article">
        {detailInfo[0].CT_VIDEO_PREPARE}
      </div>
      <br />
      <hr />
      <div className="detail_title">운동 소개</div>
      <div className="detail_article">
        {detailInfo[0].CT_VIDEO_INFO}
      </div>
      <br />
      <hr />
      <div className="detail_title">
        운동 효과
      </div>
      <div className="detail_article">{detailInfo[0].CT_VIDEO_EFFECT}</div>

      <br />
      {console.log("userSession=>", userSession)}
      {
        userSession === undefined || 'null' ? <div>
          <hr />
          <input
            type="button"
            value="돌아가기"
            className="CenterPage_button"
            onClick={
              () => navigate("/videolist")
            }
          />
        </div>
          : null
      }

      <NavigatorMain />
      <Outlet />
    </div>
  )
};

export default CenterDetail;