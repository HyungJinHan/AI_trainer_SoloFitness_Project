import React, { useEffect, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";
import NavigatorMain from "../Navigator/NavigatorMain";
import "../../styles/Detail/Detail.css";
import Swal from "sweetalert2";

const Detail = () => {
  const inputCountRef = useRef();
  const [inputCount, setInputCount] = useState(0);
  const [execToggle, setExecToggle] = useState(true);
  const [execCount, setExecCount] = useState(true);
  const [challengeToggle, setChallengeToggle] = useState(false);
  const [challengeInfo, setChallengeInfo] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  var detailCategories = queryString.parse(location.search).exec;
  const [detailInfo, setDetailInfo] = useState([
    {
      VIDEO_CATEGORY: "",
      VIDEO_VIDEO_PREPARE: "",
      VIDEO_INFO: "",
      VIDEO_EFFECT: "",
    },
  ]);
  console.log("운동 카테고리", detailCategories);
  useEffect(() => {
    axios
      .post("http://localhost:8008/detail", { detailExec: detailCategories })
      .then((res) => {
        // console.log('detail(res)->', res);
        setDetailInfo(res.data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);
  const imageSrc =
    "http://localhost:8008/uploads/slider/" + detailInfo[0].VIDEO_THUMBNAIL;
  return (
    <div className="detail_main">
      <div className="detail_image">
        <div className="detail_textDiv">
          <div className="detail_exerName">{detailCategories}</div>
          <div className="detail_category">
            # {detailInfo[0].VIDEO_CATEGORY}
          </div>
        </div>
        <img src={imageSrc} alt="undefined" width="425px" height="100%" />
        <div className="detail_layer"></div>
      </div>
      {execCount === true ? (
        <input
          className="detail_inputSolo"
          placeholder="운동 개수 지정"
          type="number"
          ref={inputCountRef}
          onChange={(e) => {
            setInputCount(e.target.value);
            axios.post("http://localhost:8000/videoshutdown", {
              count: parseInt(e.target.value),
            });
          }}
        />
      ) : (
        <input
          type="text"
          className="detail_inputChallenge"
          value="챌린지 시간은 1분입니다."
          disabled
        />
      )}
      <div className="detail_inputDiv">
        {execCount === false ? (
          <input
            value="운동 시작"
            type="button"
            onClick={() => {
              setChallengeToggle(false);
              setExecToggle(true);
              setExecCount(true);
              setChallengeInfo(false);
            }}
            className={
              execToggle === true ? "detail_execTrue" : "detail_execFalse"
            }
          />
        ) : (
          <input
            value="운동 시작"
            type="button"
            onClick={() => {
              if (
                inputCountRef.current.value === "" ||
                inputCountRef.current.value === undefined
              ) {
                Swal.fire("운동 개수를 지정해주세요.");
                return false;
              } else {
                setChallengeToggle(false);
                /** 여기서 각자 운동카테고리의 제목을 squat,pushup,pullup,situp,curl 등으로 바꿔줘야됨 */
                if (detailCategories === "스쿼트 자세 바로잡기") {
                  detailCategories = "squat";
                  navigate(`/video?exec=${detailCategories}`, {
                    state: { inputCount: inputCount },
                  });
                } else if (detailCategories === "푸쉬업으로 기초체력 늘리기") {
                  detailCategories = "pushup";
                  navigate(`/video?exec=${detailCategories}`, {
                    state: { inputCount: inputCount },
                  });
                } else if (detailCategories === "중량 스쿼트 마스터하기") {
                  detailCategories = "squat";
                  navigate(`/video?exec=${detailCategories}`, {
                    state: { inputCount: inputCount },
                  });
                } else if (detailCategories === "초심자를 위한 Sit-up") {
                  detailCategories = "situp";
                  navigate(`/video?exec=${detailCategories}`, {
                    state: { inputCount: inputCount },
                  });
                } else {
                  navigate(`/video?exec=${detailCategories}`, {
                    state: { inputCount: inputCount },
                  });
                }
              }
            }}
            className={
              execToggle === true ? "detail_execTrue" : "detail_execFalse"
            }
          />
        )}
        {challengeInfo === false ? (
          <input
            value="챌린지 시작"
            type="button"
            name="gender"
            onClick={() => {
              setExecToggle(false);
              setChallengeToggle(true);
              setExecCount(false);
              setChallengeInfo(true);
            }}
            className={
              challengeToggle === true
                ? "detail_challengeTrue"
                : "detail_challengeFalse"
            }
          />
        ) : (
          <input
            value="챌린지 시작"
            type="button"
            name="gender"
            onClick={() => {
              setExecToggle(false);
              setChallengeToggle(true);
              setExecCount(false);
              /** 여기서 각자 운동카테고리의 제목을 squat,pushup,pullup,situp,curl 등으로 바꿔줘야됨 */
              if (detailCategories === "스쿼트 자세 바로잡기") {
                detailCategories = "squat";
                navigate(`/videoc?exec=${detailCategories}`, {
                  state: { inputCount: inputCount },
                });
              } else if (detailCategories === "푸쉬업으로 기초체력 늘리기") {
                detailCategories = "pushup";
                navigate(`/videoc?exec=${detailCategories}`, {
                  state: { inputCount: inputCount },
                });
              } else if (detailCategories === "중량 스쿼트 마스터하기") {
                detailCategories = "squat";
                navigate(`/videoc?exec=${detailCategories}`, {
                  state: { inputCount: inputCount },
                });
              } else if (detailCategories === "초심자를 위한 Sit-up") {
                detailCategories = "situp";
                navigate(`/videoc?exec=${detailCategories}`, {
                  state: { inputCount: inputCount },
                });
              } else {
                navigate(`/video?exec=${detailCategories}`, {
                  state: { inputCount: inputCount },
                });
              }
            }}
            className={
              challengeToggle === true
                ? "detail_challengeTrue"
                : "detail_challengeFalse"
            }
          />
        )}
      </div>
      <hr />
      <div className="detail_prepare">필요 준비물</div>
      <div className="detail_article">{detailInfo[0].VIDEO_PREPARE}</div>
      <br />
      <hr />
      <div className="detail_title">운동 소개</div>
      {/* <div className="detail_article">{detailInfo[0].VIDEO_INFO}</div> */}
      {detailInfo[0].VIDEO_INFO.split("\\n").map((data) => {
        return <div className="detail_article">{data}</div>;
      })}
      <br />
      <hr />
      <div className="detail_title">운동 효과</div>
      {/* <p>{detailInfo[0].VIDEO_EFFECT}</p> */}
      {detailInfo[0].VIDEO_EFFECT.split("\\n").map((data) => {
        return <div className="detail_article">{data}</div>;
      })}
      <NavigatorMain />
      <Outlet />
    </div>
  );
};

export default Detail;
