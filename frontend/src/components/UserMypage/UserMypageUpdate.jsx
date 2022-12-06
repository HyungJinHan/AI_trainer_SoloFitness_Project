import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/UserMyPage/UserMyPage.css";
import DaumAddressPopup from "../CenterRegister/CenterDaumPostCode/DaumAddressPopup";
import DaumPostcode from "react-daum-postcode";
import ex from "../../static/images/HHJ/icons/MainLogo.svg";
import edit from "../../static/images/HHJ/icons/edit.svg";
import edit1 from "../../static/images/HHJ/icons/edit1.png";
import edit2 from "../../static/images/HHJ/icons/edit2.png";

// 회원 정보 수정 컴포넌트, 이름, 아이디, 등록센터 변경 불가능
// 회원 탈퇴기능도 여기 있다.

const UserMypageUpdate = (props) => {
  const navigate = useNavigate();
  const [userAddr, setUserAddr] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const infoList = props.userInfo;
  const userImage = infoList.USER_IMAGE;
  console.log("userImage=>", userImage);
  const [imageName, setImageName] = useState(userImage);

  const idRef = useRef();
  const pwRef = useRef();
  const nameRef = useRef();
  const nicknameRef = useRef();
  const emailRef = useRef();
  const addrRef = useRef();
  const telRef = useRef();
  const imageRef = useRef();
  const genderRef = useRef();
  const codeRef = useRef();

  const image = "http://localhost:8008/uploads/" + userImage;

  function onImage(e) {
    // setImageName(URL.createObjectURL(e.target.files[0]));
    setImageName(e.target.files[0]);
  }

  /** 팝업창 열기 */
  const openPostCode = () => {
    setIsPopupOpen(true);
  };

  /** 팝업창 닫기 */
  const closePostCode = () => {
    setIsPopupOpen(false);
  };

  const handlePostCode = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    addrRef.current.value = fullAddress;
    setUserAddr(fullAddress);
    closePostCode();
  };

  const updateMyInfo = () => {
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    axios
      .post(
        "http://localhost:8008/updatemyInfo",
        {
          USER_ID: idRef.current.value,
          USER_PW: pwRef.current.value,
          USER_NAME: nameRef.current.value,
          USER_NICKNAME: nicknameRef.current.value,
          USER_EMAIL: emailRef.current.value,
          USER_ADDRESS: addrRef.current.value,
          USER_TEL: telRef.current.value,
          USER_IMAGE: imageName,
          USER_SEX: genderRef.current.value,
          USER_ACCESS_CODE: codeRef.current.value,
        },
        config
      )
      .then((res) => {
        console.log(res.status);
        if (res.status === 200) {
          console.log("업데이트 완료");
          props.setMode(0);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteUser = () => {
    axios
      .post("http://localhost:8008/deleteuser", {
        USER_ID: infoList.USER_ID,
      })
      .then((res) => {
        console.log("회원탈퇴 성공", res);
        window.sessionStorage.clear();
        navigate("/");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="UserMyPage_main">
      <div className="UserMyPage_InfoUpdate">내 정보 수정</div>
      <div className="UserMyPage_UpdateBorder">
        <br />
        <img className="UserMyPage_image" src={image} alt="undefind" />
        <label className="UserMyPage_label" for="ex_file">
          <div className="UserMyPage_profileDiv">
            <img className="UserMyPage_profile" src={edit1} alt="sample" />
          </div>
        </label>
        <br />
        {/* <label className="UserMyPage_imageUpload" for="ex_file">
          프로필 사진 업로드
        </label> */}
        <input
          style={{ display: "none" }}
          id="ex_file"
          type="file"
          name="image"
          ref={imageRef}
          accept="image/*"
          onChange={onImage}
        />
        <div className="UserMyPage_inputDiv">
          <input type="button" className="UserMyPage_overlap" value="닉네임" />
          <input
            className="UserMyPage_input"
            type="text"
            name="myname"
            ref={nicknameRef}
            autoComplete="off"
            defaultValue={infoList.USER_NICKNAME}
          />
        </div>
        <div className="UserMyPage_inputDiv">
          <input type="button" className="UserMyPage_overlap" value="이름" />
          <input
            className="UserMyPage_input"
            type="text"
            name="myname"
            ref={nameRef}
            autoComplete="off"
            readOnly
            defaultValue={infoList.USER_NAME}
          />
        </div>
        <div className="UserMyPage_inputDiv">
          <input type="button" className="UserMyPage_overlap" value="아이디" />
          <input
            className="UserMyPage_input"
            type="text"
            name="myname"
            ref={idRef}
            autoComplete="off"
            readOnly
            defaultValue={infoList.USER_ID}
          />
        </div>
        <div className="UserMyPage_inputDiv">
          <input
            type="button"
            className="UserMyPage_overlap"
            value="비밀번호"
          />
          <input
            className="UserMyPage_input"
            type="password"
            name="myname"
            ref={pwRef}
            autoComplete="off"
            defaultValue={infoList.USER_PW}
          />
        </div>
        <div className="UserMyPage_inputDiv">
          <input type="button" className="UserMyPage_overlap" value="이메일" />
          <input
            className="UserMyPage_input"
            type="text"
            name="myname"
            ref={emailRef}
            autoComplete="off"
            defaultValue={infoList.USER_EMAIL}
          />
        </div>
        <div className="UserMyPage_inputDiv">
          <input
            type="button"
            className="UserMyPage_overlap"
            value="전화번호"
          />
          <input
            className="UserMyPage_input"
            type="text"
            name="mytel"
            ref={telRef}
            autoComplete="off"
            defaultValue={infoList.USER_TEL}
          />
        </div>
        <input
          className="UserMyPage_inputAddress"
          type="text"
          name="address"
          size="20"
          autoComplete="off"
          ref={addrRef}
          defaultValue={infoList.USER_ADDRESS}
          onClick={() => {
            openPostCode();
            addrRef.current.value = "";
          }}
          onChange={() => {
            openPostCode();
            setUserAddr(addrRef.current.value);
          }}
          placeholder="우편번호 검색을 이용해주세요."
        />
        {/* 팝업 생성 기준 div */}
        <div id="popupDom">
          {isPopupOpen && (
            <DaumAddressPopup>
              <div>
                <DaumPostcode onComplete={handlePostCode} />
                {/* 닫기 버튼 생성 */}
                <button
                  type="button"
                  onClick={() => {
                    closePostCode();
                  }}
                  className="UserMyPage_button"
                >
                  닫기
                </button>
              </div>
            </DaumAddressPopup>
          )}
        </div>
        <input
          className="UserMyPage_input"
          type="hidden"
          name="gender"
          ref={genderRef}
          autoComplete="off"
          defaultValue={infoList.USER_SEX}
        />
        <input
          className="UserMyPage_input"
          type="hidden"
          name="code"
          ref={codeRef}
          autoComplete="off"
          defaultValue={infoList.USER_ACCESS_CODE}
        />
        {/* {
          infoList.USER_ACCESS_CODE === null ? null :
            <div>
              <p>등록센터</p>
              <input
                type='text'
                name='myname'
                ref={addrRef}
                autoComplete="off"
                readOnly
                defaultValue={infoList.USER_ACCESS_CODE}
              />
            </div>
        } */}
        <div>
          <input
            className="UserMyPage_button"
            type="button"
            name="updatebtn"
            value="수정하기"
            onClick={updateMyInfo}
          />
        </div>
        <div>
          <input
            className="UserMyPage_button"
            type="button"
            name="deletebtn"
            value="회원탈퇴"
            onClick={deleteUser}
          />
        </div>
      </div>
    </div>
  );
};

export default UserMypageUpdate;
