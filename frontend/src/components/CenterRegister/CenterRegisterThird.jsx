import React, { useRef, useState } from 'react';
import DaumPostcode from "react-daum-postcode";
import DaumAddressPopup from '../Register/DaumPostCode/DaumAddress/DaumAddressPopup';
import styled from 'styled-components';

const CenterRegisterThird = ({
  setCenterAddress,
  setCenterTel,
  setCenterEmail,
  setCenterAccess,
  consoleAll,
  insertCenter
}) => {
  const ErrorDiv = styled.p`
    background-color: red;
    color: white;
  `

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  /** 주소 인식 */
  const [hiddenAddressKey, setHiddenAddressKey] = useState(false);
  const [addressMessage, setAddressMessage] = useState('');
  /** 전화번호 인식 */
  const [hiddenTelKey, setHiddenTelKey] = useState(false);
  const [telMessage, setTelMessage] = useState('');
  /** 이메일 확인 인식 */
  const [hiddenEmailkKey, setHiddenEmailkKey] = useState(false);
  const [emailMessage, setEmailMessage] = useState('');
  /** 인증코드 인식 */
  const [hiddenCodeKey, setHiddenCodeKey] = useState(false);
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
      setHiddenAddressKey(true);
      setAddressMessage(
        <p>센터 주소를 입력하세요.</p>
      )
      addressRef.current.focus();
      return false;
    }
    else {
      setHiddenAddressKey(false);
      setAddressMessage('');
      telRef.current.focus();
    }

    if (telRef.current.value === "" || telRef.current.value === undefined) {
      setHiddenTelKey(true);
      setTelMessage(
        <p>센터 전화번호를 입력하세요.</p>
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
          setHiddenTelKey(true);
          setTelMessage(
            <p>전화번호는 숫자로만 입력해주세요.</p>
          )
          telRef.current.focus();
          return false;
        }
      }
    }

    setHiddenTelKey(false);
    setTelMessage('');
    emailRef.current.focus();

    if (emailRef.current.value === "" || emailRef.current.value === undefined) {
      setHiddenEmailkKey(true);
      setEmailMessage(
        <p>센터 이메일을 입력해주세요.</p>
      )
      emailRef.current.focus();
      return false;
    }
    else {
      setHiddenEmailkKey(false);
      setEmailMessage('');
      codeRef.current.focus();
    }

    if (codeRef.current.value === "" || codeRef.current.value === undefined) {
      setHiddenCodeKey(true);
      setCodeMessage(
        <p>센터 승인 코드를 입력해주세요.</p>
      )
      codeRef.current.focus();
      return false;
    }

    consoleAll();
    insertCenter();
  }

  // console.log(addressRef.current.value);

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
        <ErrorDiv>
          {
            setHiddenAddressKey === true ?
              <p>{addressMessage}</p> :
              <>{addressMessage}</>
          }
        </ErrorDiv>
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
        <ErrorDiv>
          {
            setHiddenTelKey === true ?
              <p>{telMessage}</p> :
              <>{telMessage}</>
          }
        </ErrorDiv>
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
        <ErrorDiv>
          {
            setHiddenEmailkKey === true ?
              <p>{emailMessage}</p> :
              <>{emailMessage}</>
          }
        </ErrorDiv>
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
        <ErrorDiv>
          {
            setHiddenCodeKey === true ?
              <p>{codeMessage}</p> :
              <>{codeMessage}</>
          }
        </ErrorDiv>
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