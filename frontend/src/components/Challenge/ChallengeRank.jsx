import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import "../../styles/Challenge/ChallengeRank.css";
import Navigator from "../Navigator/Navigator";
import img1 from "../../static/images/KCJ/rabbit.jpg";
import axios from "axios";

const ChallengeRank = () => {
  const [nickname, setNickname] = useState();
  const [resultScore, setResultScore] = useState(0);
  const [rank, setRank] = useState([]);
  const [myrank, setMyrank] = useState();
  const [myRanking, setMyRanking] = useState();

  useEffect(() => {
    axios
      .post("http://localhost:8008/fitnessresultusernickname", {
        userNickname: window.sessionStorage.getItem("userID"),
      })
      .then((res) => {
        setNickname(res.data[0].USER_NICKNAME);
        console.log(nickname);
        axios
          .post("http://localhost:8008/challengescore", {
            Nickname: nickname,
          })
          .then((res) => {
            // if (res.data[0]?.CHALLENGE_SQUAT_SCORE === null) {
            //   res.data[0].CHALLENGE_SQUAT_SCORE = 0;
            // }
            // if (res.data[0]?.CHALLENGE_PULLUP_SCORE === null) {
            //   res.data[0].CHALLENGE_PULLUP_SCORE = 0;
            // }
            // if (res.data[0]?.CHALLENGE_PUSHUP_SCORE === null) {
            //   res.data[0].CHALLENGE_PUSHUP_SCORE = 0;
            // }
            // if (res.data[0]?.CHALLENGE_SITUP_SCORE === null) {
            //   res.data[0].CHALLENGE_SITUP_SCORE = 0;
            // }
            // if (res.data[0]?.CHALLENGE_CURL_SCORE === null) {
            //   res.data[0].CHALLENGE_CURL_SCORE = 0;
            // }
            const allScore =
              res.data[0]?.CHALLENGE_PULLUP_SCORE * 100 +
              res.data[0]?.CHALLENGE_SQUAT_SCORE * 75 +
              res.data[0]?.CHALLENGE_PUSHUP_SCORE * 60 +
              res.data[0]?.CHALLENGE_SITUP_SCORE * 45 +
              res.data[0]?.CHALLENGE_CURL_SCORE * 30;
            setResultScore(allScore);
            console.log(resultScore);
            axios
              .post("http://localhost:8008/challengescoreresult", {
                Nickname: nickname,
                resultScore1: resultScore,
              })
              .then(
                axios
                  .post("http://localhost:8008/challengerank")
                  .then((res) => {
                    setRank(res.data);
                    console.log(rank);
                    axios
                      .post("http://localhost:8008/mychallengerank", {
                        Nickname: nickname,
                      })
                      .then((res) => {
                        setMyrank(res.data[0]);
                        axios
                          .post("http://localhost:8008/mychallengeranking", {
                            Nickname: nickname,
                          })
                          .then((res) => {
                            setMyRanking(res.data[0]);
                          });
                      });
                  })
              );
          });
      });
  }, [resultScore]);
  console.log(myrank);
  console.log(myRanking);

  return (
    <div className="ChallengeRank_top_div">
      <div className="ChallengeRank_rank_text">랭킹</div>
      {rank.map((ranklist, index) => {
        return (
          <div className="ChallengeRank_main_div" key={index}>
            <div className="ChallengeRank_main_profile">
              <img src={img1}></img>
            </div>
            <div className="ChallengeRank_main_rank">{ranklist.RANKING} 등</div>
            <div className="ChallengeRank_main_name">
              {ranklist.CHALLENGE_USER}
              <br />
              {ranklist.CHALLENGE_SCORE}점
            </div>
          </div>
        );
      })}
      <div className="ChallengeRank_my_rank">
        <div className="ChallengeRank_main_profile">
          <img src={img1}></img>
        </div>
        <div className="ChallengeRank_main_rank"> {myRanking?.MYRANKING}등</div>
        <div className="ChallengeRank_main_name">
          {myrank?.CHALLENGE_USER}
          <br />
          {myrank?.CHALLENGE_SCORE}점
        </div>
      </div>
      <div className="ChallengeRank_rank_footer_navigator">
        <Navigator />
        <Outlet />
      </div>
    </div>
  );
};

export default ChallengeRank;
