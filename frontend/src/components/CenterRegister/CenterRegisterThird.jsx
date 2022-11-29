import React, { useRef, useState } from 'react';
import DaumPostcode from "react-daum-postcode";
import DaumAddressPopup from '../CenterRegister/CenterDaumPostCode/DaumAddressPopup.jsx';
import '../../styles/CenterRegister/CenterRegister.css'

const CenterRegisterThird = ({
  setCenterAddress,
  setCenterTel,
  setCenterEmail,
  setCenterAccess,
  consoleAll,
  insertCenter
}) => {

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
    setErrorMessage('');
    closePostCode();
  };

  const doneJob = () => {
    if (telRef.current.value === "" || telRef.current.value === undefined) {
      setErrorMessage(
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
          setErrorMessage(
            '전화번호는 숫자로만 입력해주세요.'
          )
          telRef.current.focus();
          return false;
        }
      }
    }

    setErrorMessage('');
    emailRef.current.focus();

    if (emailRef.current.value === "" || emailRef.current.value === undefined) {
      setErrorMessage(
        '센터 이메일을 입력해주세요.'
      )
      emailRef.current.focus();
      return false;
    }
    else {
      setErrorMessage('');
      codeRef.current.focus();
    }

    if (codeRef.current.value === "" || codeRef.current.value === undefined) {
      setErrorMessage(
        '센터 승인 코드를 입력해주세요.'
      )
      codeRef.current.focus();
      return false;
    }

    if (addressRef.current.value === "" || addressRef.current.value === undefined) {
      setErrorMessage(
        '센터 주소를 입력하세요.'
      )
      addressRef.current.focus();
      return false;
    }
    else {
      setErrorMessage('');
    }

    consoleAll();
    insertCenter();
  }

  return (
    <div className='CenterRegister_main'>
      <div className='CenterRegister_info'>
        센터 정보를
        <br />
        입력해주세요.
      </div>
      <div>
        <input
          className='CenterRegister_inputSolo'
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
      </div>
      <div>
        <input
          className='CenterRegister_inputSolo'
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
      </div>
      <div>
        <input
          className='CenterRegister_inputSolo'
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
        <div className='CenterRegister_inputDiv'>
          <input
            className='CenterRegister_input'
            type="text"
            name="address"
            size="20"
            autoComplete="off"
            placeholder="우편번호 검색을 이용해주세요."
            ref={addressRef}
            onClick={() => {
              openPostCode();
              addressRef.current.value = '';
            }}
            onChange={() => {
              openPostCode();
              setCenterAddress(addressRef.current.value);
            }}
          />
          {/* 버튼 클릭 시 팝업 생성 */}
          <input
            value='우편번호 검색'
            type='button'
            className='CenterRegister_overlap'
            onClick={openPostCode}
          />
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
        <div className='CenterRegister_error'>
          {errorMessage}
        </div>
      </div>
      <div>
        <input
          value='등록하기'
          className='CenterRegister_button'
          onClick={doneJob}
        />
      </div>
    </div>
  );
};

export default CenterRegisterThird;