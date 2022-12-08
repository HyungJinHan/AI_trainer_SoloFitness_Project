import axios from "axios";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/CenterPage/CenterPage.css";
import Swal from "sweetalert2";

const CenterUpload = (props) => {
  const navigate = useNavigate();

  const titleRef = useRef();
  const categoryRef = useRef();
  const infoRef = useRef();
  const effectRef = useRef();
  const addressRef = useRef();
  const partRef = useRef();
  const prepareRef = useRef();

  function handleUpload() {
    if (titleRef.current.value === "" || titleRef.current.value === undefined) {
      Swal.fire("제목을 입력하세요.");
      titleRef.current.focus();
      return false;
    }
    if (categoryRef.current.value === "") {
      Swal.fire("카테고리를 선택하세요.");
      categoryRef.current.focus();
      return false;
    }
    if (infoRef.current.value === "" || infoRef.current.value === undefined) {
      Swal.fire("운동소개를 입력하세요.");
      infoRef.current.focus();
      return false;
    }
    if (partRef.current.value === "" || partRef.current.value === undefined) {
      Swal.fire("운동부위를 입력하세요.");
      partRef.current.focus();
      return false;
    }
    if (
      effectRef.current.value === "" ||
      effectRef.current.value === undefined
    ) {
      Swal.fire("운동효과를 입력하세요.");
      effectRef.current.focus();
      return false;
    }
    if (
      prepareRef.current.value === "" ||
      prepareRef.current.value === undefined
    ) {
      Swal.fire("운동 준비물을 입력하세요.");
      prepareRef.current.focus();
      return false;
    }

    // const regExp =
    //   /(https?:\/\/)([A-Za-z0-9\w]+\.*)+(\.com|\.co\.kr|\.net)/gi.test(
    //     addressRef.current.value
    //   );
    if (addressRef.current.value === "" ||
      addressRef.current.value === undefined) {
      Swal.fire("url을 입력하세요.");
      addressRef.current.focus();
      return false;
    }

    axios
      .post("http://localhost:8008/centerupload", {
        title: titleRef.current.value,
        category: categoryRef.current.value,
        info: infoRef.current.value,
        effect: effectRef.current.value,
        address: addressRef.current.value,
        part: partRef.current.value,
        prepare: prepareRef.current.value,
        writer: window.sessionStorage.getItem("centerID"),
      })
      .then((res) => {
        // console.log("handleUpload(res)->", res);
        Swal.fire("등록이 완료되었습니다.");
        navigate("/videolist");
      })
      .catch((e) => {
        console.error(e);
      });
  }

  return (
    <div className="CenterPage_main">
      <div className="CenterPage_InfoUpdateNoDesc">센터 컨텐츠 등록</div>
      <div className="CenterPage_UpdateBorder">
        <div className="CenterPage_inputDiv">
          <input type="button" className="CenterPage_overlap" value="타이틀" />
          <input type="text" ref={titleRef} className="CenterPage_input" />
        </div>
        <div className="CenterPage_inputDiv">
          <input
            type="button"
            className="CenterPage_overlap"
            value="카테고리"
          />
          {/* <div><input type="text" ref={categoryRef} /></div> */}
          <select ref={categoryRef} className="CenterPage_input">
            <option value="">카테고리 선택</option>
            <option value="하체">하체</option>
            <option value="상체">상체</option>
            <option value="기구운동">기구운동</option>
            <option value="맨몸운동">맨몸운동</option>
            <option value="요가">요가</option>
            <option value="스트레칭">스트레칭</option>
            <option value="전신운동">전신운동</option>
            <option value="필라테스">필라테스</option>
            <option value="유산소">유산소</option>
          </select>
        </div>
        <div className="CenterPage_inputSolo">
          운동 소개
          <br />
          <textarea className="CenterPage_textarea" ref={infoRef} />
        </div>
        <div className="CenterPage_inputSolo">
          운동 부위
          <br />
          <textarea className="CenterPage_textarea" ref={partRef} />
        </div>
        <div className="CenterPage_inputSolo">
          운동 효과
          <br />
          <textarea className="CenterPage_textarea" ref={effectRef} />
        </div>
        <div className="CenterPage_inputSolo">
          운동 준비물
          <br />
          <textarea className="CenterPage_textarea" ref={prepareRef} />
        </div>
        <div className="CenterPage_inputDiv">
          <input
            type="button"
            className="CenterPage_overlap"
            value="파일 첨부"
          />
          <input
            type="text"
            ref={addressRef}
            placeholder="해당 영상의 url 입력"
            className="CenterPage_input"
          />
        </div>
        <div>
          <input
            className="CenterPage_button"
            type="button"
            value="동영상 업로드"
            onClick={() => {
              handleUpload();
            }}
          />
        </div>
        <input
          className="CenterPage_button"
          type="button"
          value="돌아가기"
          onClick={() => {
            props.setMode(0);
          }}
        />
      </div>
    </div>
  );
};

export default CenterUpload;
