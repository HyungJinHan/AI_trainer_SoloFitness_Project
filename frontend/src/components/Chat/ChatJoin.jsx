import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

import "../../styles/Chat/Join.css";

export default function ChatJoin() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  // const roomRef = useRef();

  return (
    <div className="join_main">
      <div className="join_info">
        실시간 문의를 위한
        <br />
        닉네임을 작성해주세요.
      </div>
      <div>
        <input
          placeholder="닉네임을 작성해주세요."
          className="joinInput"
          type="text"
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div>
        {/* <input
            placeholder="Room"
            className="joinInput mt-20"
            type="hidden"
            onChange={(event) => setRoom(event.target.value)}
            defaultValue='adminchat'
            ref={roomRef}
          /> */}
      </div>
      <Link
        onClick={(e) => (!name || !"실시간 문의" ? e.preventDefault() : null)}
        to={`/chat?name=${name}&room=${"실시간 문의"}`}
      >
        <button className={"button mt-20"} type="submit">
          참여하기
        </button>
      </Link>
    </div>
  );
}
