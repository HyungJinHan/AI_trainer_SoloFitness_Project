import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigator from '../Navigator/Navigator';

function ChallengeMain(props) {
  return (
    <div>
      <a href="/videoc?exec=squat">스쿼트챌린지</a>
      &nbsp;&nbsp;
      <a href="/videoc?exec=pullup">풀업챌린지</a>
      &nbsp;&nbsp;
      <a href="/videoc?exec=pushup">푸쉬업챌린지</a>
      &nbsp;&nbsp;
      <a href="/videoc?exec=situp">싯업챌린지</a>
      &nbsp;&nbsp;
      <a href="/videoc?exec=curl">덤벨컬챌린지</a>
      &nbsp;&nbsp;
      <Navigator />
      <Outlet />
    </div>
  );
}

export default ChallengeMain;