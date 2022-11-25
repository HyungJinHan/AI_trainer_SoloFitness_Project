import React, { useState } from "react";
import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddressPopup from "./StoreDaumAddress/DaumAddressPopup";
import DaumPostcode from "react-daum-postcode";
import "./MemberForm.css";
import Swal from "sweetalert2";

const MemberForm = () => {
  const addressRef = useRef();

  const navigate = useNavigate();

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // 팝업창 열기
  const openPostCode = () => {
    setIsPopupOpen(true);
  };

  // 팝업창 닫기
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
    addressRef.current.value = fullAddress;
    closePostCode();
  };

  const handleMember = () => {
    var str,
      i,
      ch = "";
    if (
      addressRef.current.value === "" ||
      addressRef.current.value === undefined
    ) {
      Swal.fire({
        title: "주소를 입력해주세요.",
        width: "370px",
      });
      addressRef.current.focus();
      return false;
    }

    axios
      .post("http://localhost:8008/member", {
        user_address: addressRef.current.value,
      })
      .then((res) => {
        console.log("handleMember : ", res);
        if (res.data.affectedRows === 1) {
          Swal.fire({
            title: "회원등록에 성공했습니다.",
            width: "370px",
          });
          navigate("/login");
        } else {
          Swal.fire({
            title: "아이디가 중복됩니다.",
            width: "370px",
          });
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <div className="form">
      <h1 align="center" className="logo1">
        개인 회원가입
      </h1>
      <div className="scroll2">
        <div>
          <div className="div111" id="juso">
            주소
            {/* 버튼 클릭 시 팝업 생성 */}
            <button
              type="button"
              onClick={openPostCode}
              className="address_search1"
            >
              우편번호 검색
            </button>
          </div>
          {/* 팝업 생성 기준 div */}
          <div id="popupDom">
            {isPopupOpen && (
              <AddressPopup>
                <div>
                  <DaumPostcode onComplete={handlePostCode} />
                  {/* 닫기 버튼 생성 */}
                  <button
                    type="button"
                    onClick={() => {
                      closePostCode();
                    }}
                    className="close"
                  >
                    닫기
                  </button>
                </div>
              </AddressPopup>
            )}
          </div>

          <input
            type="text"
            name="address"
            size="20"
            defaultValue=""
            autoComplete="off"
            ref={addressRef}
            className="gaip_address"
            onClick={() => {
              Swal.fire({
                title: "우편번호 검색을 이용해주세요.",
                width: "370px",
              });
              return false;
            }}
            onChange={() => {
              Swal.fire({
                title: "우편번호 검색을 이용해주세요.",
                width: "370px",
              });
              addressRef.current.value = "";
              return false;
            }}
            placeholder="우편번호 검색을 이용해주세요."
          />
        </div>
      </div>
    </div>
  );
};

export default MemberForm;
