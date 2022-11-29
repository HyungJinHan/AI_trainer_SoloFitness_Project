import React, { useRef, useState } from 'react';
import DaumPostcode from "react-daum-postcode";
import DaumAddressPopup from '../CenterRegister/CenterDaumPostCode/DaumAddressPopup.jsx';

const CenterRegisterThird = ({
  setCenterAddress,
  setCenterTel,
  setCenterEmail,
  setCenterAccess,
  consoleAll,
  insertCenter
}) => {

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  /** 주소 인식 */
  const [addressMessage, setAddressMessage] = useState('');
  /** 전화번호 인식 */
  const [telMessage, setTelMessage] = useState('');
  /** 이메일 확인 인식 */
  const [emailMessage, setEmailMessage] = useState('');
  /** 인증코드 인식 */
  const [codeMessage, setCodeMessage] = useState('');

  const addressRef = useRef();
  const telRef = useRef();
  const emailRef = useRef();
  const codeRef = useRef();

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
    addressRef.current.value = fullAddress;
    setCenterAddress(fullAddress);
    setAddressMessage('');
    closePostCode();
  };

  const doneJob = () => {
    if (addressRef.current.value === "" || addressRef.current.value === undefined) {
      setAddressMessage(
        '센터 주소를 입력하세요.'
      )
      addressRef.current.focus();
      return false;
    }
    else {
      setAddressMessage('');
      telRef.current.focus();
    }

    if (telRef.current.value === "" || telRef.current.value === undefined) {
      setTelMessage(
        '센터 전화번호를 입력하세요.'
      )
      telRef.current.focus();
      return false;
    } else {
      const str = telRef.current.value;
      for (var i = 0; i < str.length; i++) {
        const ch = str.substring(i, i + 1);
        if (
          !(ch >= "0" && ch <= "9") ||
          (ch >= "a" && ch <= "z") ||
          (ch >= "A" && ch <= "Z")
        ) {
          setTelMessage(
            '전화번호는 숫자로만 입력해주세요.'
          )
          telRef.current.focus();
          return false;
        }
      }
    }

    setTelMessage('');
    emailRef.current.focus();

    if (emailRef.current.value === "" || emailRef.current.value === undefined) {
      setEmailMessage(
        '센터 이메일을 입력해주세요.'
      )
      emailRef.current.focus();
      return false;
    }
    else {
      setEmailMessage('');
      codeRef.current.focus();
    }

    if (codeRef.current.value === "" || codeRef.current.value === undefined) {
      setCodeMessage(
        '센터 승인 코드를 입력해주세요.'
      )
      codeRef.current.focus();
      return false;
    }

    consoleAll();
    insertCenter();
  }

  return (
    <div>
      <div>
        <div className="div111" id="juso">
          주소
          {/* 버튼 클릭 시 팝업 생성 */}
          <button
            type="button"
            onClick={openPostCode}
          >
            우편번호 검색
          </button>
        </div>
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
                  className="close"
                >
                  닫기
                </button>
              </div>
            </DaumAddressPopup>
          )}
        </div>
        <input
          type="text"
          name="address"
          size="20"
          autoComplete="off"
          ref={addressRef}
          onClick={() => {
            openPostCode();
            addressRef.current.value = '';
          }}
          onChange={() => {
            openPostCode();
            setCenterAddress(addressRef.current.value);
          }}
          placeholder="우편번호 검색을 이용해주세요."
        />
        {/* <ErrorDiv> */}
        <div>
          {addressMessage}
        </div>
        {/* </ErrorDiv> */}
      </div>
      {/* <input
        type="hidden"
        name="address_data"
        autoComplete="off"
        placeholder='주소 들어오는 곳'
        onChange={() => {
          setCenterAddress(addressRef.current.value);
          telRef.current.focus();
        }}
      /> */}
      <div>
        <input
          type="tel"
          name="tel"
          autoComplete="off"
          defaultValue=''
          ref={telRef}
          onChange={(e) => {
            setCenterTel(e.target.value);
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              emailRef.current.focus();
            }
          }}
          placeholder='센터 전화번호를 입력하세요.'
        />
        {/* <ErrorDiv> */}
        <div>
          {telMessage}
        </div>
        {/* </ErrorDiv> */}
      </div>
      <div>
        <input
          type="email"
          name="email"
          autoComplete="off"
          defaultValue=''
          ref={emailRef}
          onChange={(e) => {
            setCenterEmail(e.target.value)
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              doneJob();
            }
          }}
          placeholder='센터 이메일을 입력하세요.'
        />
        {/* <ErrorDiv> */}
        <div>
          {emailMessage}
        </div>
        {/* </ErrorDiv> */}
      </div>
      <div>
        <input
          type="text"
          name="code"
          autoComplete="off"
          defaultValue=''
          ref={codeRef}
          onChange={(e) => {
            setCenterAccess(e.target.value)
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              doneJob();
            }
          }}
          placeholder='센터 인증 코드를 입력하세요.'
        />
        {/* <ErrorDiv> */}
        <div>
          {codeMessage}
        </div>
        {/* </ErrorDiv> */}
      </div>
      <div>
        <button
          onClick={doneJob}
        >
          등록하기
        </button>
      </div>
    </div>
  );
};

export default CenterRegisterThird;