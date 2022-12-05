import React, {useEffect, useState} from "react";
import queryString from 'query-string';
import { useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import ReactPlayer from 'react-player';

const CenterDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const centerExec = queryString.parse(location.search).exec;
  const [detailInfo, setDetailInfo] = useState([{
    "CT_VIDEO_TITLE":"",
    "CT_VIDEO_CATEGORY":"",
    "CT_VIDEO_INFO":"",
    "CT_VIDEO_BODY_PART":"",
    "CT_VIDEO_EFFECT":"",
    "CT_VIDEO_PREPARE":""
  }])

  useEffect(() => {
    axios.post("http://localhost:8008/centerdetail",{
      centerExec:queryString.parse(location.search).exec
    }).then((res) => {
      // console.log("CenterDetail(res)->",res);
      setDetailInfo(res.data);
    }).catch((e) => {
      console.error(e);
    })
  },[]);

  return(
    <div>
      <ReactPlayer
        className='CenterDetail_video'
        url={detailInfo[0].CT_VIDEO_ADDRESS}
        controls
        width={'100%'}
        // height={'50%'}
      />
      <br />
      <div>{detailInfo[0].CT_VIDEO_TITLE}</div>
      <div>{detailInfo[0].CT_VIDEO_CATEGORY}</div>

      <br />
      <hr />
      <div>운동부위</div>
      <div>{detailInfo[0].CT_VIDEO_BODY_PART}</div>
      <br />
      <hr />
      <div>필요 준비물</div>
      <div>
        {detailInfo[0].CT_VIDEO_PREPARE}
      </div>
      <br />
      <hr />
      <div>운동 소개</div>
      <div>
        {detailInfo[0].CT_VIDEO_INFO}
      </div>
      <br />
      <hr />
      <div>
        운동 효과
      </div>
      <div>{detailInfo[0].CT_VIDEO_EFFECT}</div>

      <br />
      <div>
        <input type="button" value="돌아가기" onClick={()=>navigate(-1)} />
      </div>
    </div>
  )
};

export default CenterDetail;