import React, { useEffect, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";
import Navigator from "../Navigator/Navigator";
import "../../styles/Detail/Detail.css";

const Detail = () => {
  const inputCountRef = useRef();
  const [inputCount, setInputCount] = useState(0);
  const [execToggle, setExecToggle] = useState(true);
  const [execCount, setExecCount] = useState(true);
  const [challengeToggle, setChallengeToggle] = useState(false);
  const [challengeInfo, setChallengeInfo] = useState(false);
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
    <div className="detail_main">
      <div className="detail_image">
        <img
          src={detailInfo[0].VIDEO_THUMBNAIL}
          alt="undefined"
          width='100%'
          height='50%'
        />
        <div className="detail_textDiv">
          <div className="detail_exerName">
            {detailCategories}
          </div>
          <div className="detail_category">
            #{detailInfo[0].VIDEO_CATEGORY}
          </div>
        </div>
      </div>
      {
        execCount === true ?
          <input
            className="detail_inputSolo"
            placeholder="운동 개수 지정"
            type='number'
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
          :
          <input
            type='text'
            className="detail_inputChallenge"
            value='챌린지 시간은 1분입니다.'
            disabled
          />
      }
      <div className='detail_inputDiv'>
        {
          execCount === false ?
            <input
              value='운동 시작'
              type='button'
              onClick={() => {
                setChallengeToggle(false);
                setExecToggle(true);
                setExecCount(true);
                setChallengeInfo(false);
              }}
              className={
                execToggle === true ?
                  'detail_execTrue' : 'detail_execFalse'
              }
            />
            :
            <input
              value='운동 시작'
              type='button'
              onClick={() => {
                if (inputCountRef.current.value === '' || inputCountRef.current.value === undefined) {
                  alert('운동 개수를 지정해주세요.');
                  return false;
                } else {
                  setChallengeToggle(false);
                  navigate(`/video?exec=${detailCategories}`, { state: { inputCount: inputCount } });
                }
              }}
              className={
                execToggle === true ?
                  'detail_execTrue' : 'detail_execFalse'
              }
            />
        }
        {
          challengeInfo === false ?
            <input
              value='챌린지 시작'
              type='button'
              name='gender'
              onClick={() => {
                setExecToggle(false);
                setChallengeToggle(true);
                setExecCount(false);
                setChallengeInfo(true);
              }}
              className={
                challengeToggle === true ?
                  'detail_challengeTrue' : 'detail_execFalse'
              }
            />
            :
            <input
              value='챌린지 시작'
              type='button'
              name='gender'
              onClick={() => {
                setExecToggle(false);
                setChallengeToggle(true);
                setExecCount(false);
                navigate(`/videoc?exec=${detailCategories}`)
              }}
              className={
                challengeToggle === true ?
                  'detail_challengeTrue' : 'detail_challengeFalse'
              }
            />
        }
      </div>
      <hr />
      <div className="detail_prepare">
        필요 준비물
      </div>
      <div className="detail_article">
        {detailInfo[0].VIDEO_PREPARE}
      </div>
      <br />
      <hr />
      <div className="detail_title">
        운동 소개
      </div>
      <div className="detail_article">
        {detailInfo[0].VIDEO_INFO}
      </div>
      <br />
      <hr />
      <div className="detail_title">
        운동 효과
      </div>
      {/* <p>{detailInfo[0].VIDEO_EFFECT}</p> */}
      {
        detailInfo[0].VIDEO_EFFECT.split("\\n").map((data) => {
          return (
            <div className="detail_article">
              {data}
            </div>
          )
        })
      }
      <Navigator />
      <Outlet />
    </div>
  )
};

export default Detail;