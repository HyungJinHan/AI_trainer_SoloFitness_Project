import React, { useRef, useState } from 'react';
import DaumPostcode from "react-daum-postcode";
import DaumAddressPopup from '../CenterRegister/CenterDaumPostCode/DaumAddressPopup.jsx';
import '../../styles/UserRegister/UserRegister.css'

const RegisterThird = ({
  setUserName,
  setUserSex,
  setUserTel,
  setUserEmail,
  setUserAddr,
  setMode,
  consoleAll
}) => {

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [maleToggle, setMaleToggle] = useState(false);
  const [femaleToggle, setFemaleToggle] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  const nameRef = useRef();
  const maleRef = useRef();
  const femaleRef = useRef();
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
    setUserAddr(fullAddress);
    setErrorMessage('');
    closePostCode();
  };

  const doneJob = () => {
    if (nameRef.current.value === "" || nameRef.current.value === undefined) {
      setErrorMessage(
        '이름을 입력하세요.'
      )
      addressRef.current.focus();
      return false;
    } else {
      setErrorMessage('');
    }

    if ((maleToggle === false) && (femaleToggle === false)) {
      setErrorMessage(
        '성별을 선택해주세요.'
      )
      return false;
    } else {
      setErrorMessage('');
    }

    if (telRef.current.value === "" || telRef.current.value === undefined) {
      setErrorMessage(
        '전화번호를 입력하세요.'
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
        '이메일을 입력해주세요.'
      )
      emailRef.current.focus();
      return false;
    }
    else {
      setErrorMessage('');
      addressRef.current.focus();
    }
    if (addressRef.current.value === "" || addressRef.current.value === undefined) {
      setErrorMessage(
        '주소를 입력하세요.'
      )
      addressRef.current.focus();
      return false;
    } else {
      setErrorMessage('');
    }
    consoleAll();
    setMode(3);
  }

  return (
    <div className='UserRegister_main'>
      <div className='UserRegister_info'>
        개인 정보를
        <br />
        입력해주세요.
      </div>
      <div>
        <input
          className='UserRegister_inputSolo'
          type="text"
          name="username"
          ref={nameRef}
          defaultValue=''
          autoComplete="off"
          placeholder='이름을 입력하세요.'
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
      </div>
      <div className='UserRegister_genderDiv'>
        <input
          value='남성'
          type='button'
          name='gender'
          onClick={() => {
            setUserSex(maleRef.current.value);
            setMaleToggle(true);
            setFemaleToggle(false);
          }}
          className={
            maleToggle === true ?
              'UserRegister_maleTrue' : 'UserRegister_maleFalse'
          }
        />
        <input
          type="hidden"
          defaultValue='male'
          ref={maleRef}
        />
        <input
          value='여성'
          type='button'
          name='gender'
          onClick={() => {
            setMaleToggle(false);
            setFemaleToggle(true);
            setUserSex(femaleRef.current.value);
          }}
          className={
            femaleToggle === true ?
              'UserRegister_femaleTrue' : 'UserRegister_femaleFalse'
          }
        />
        <input
          type="hidden"
          defaultValue='female'
          ref={femaleRef}
        />
      </div>
      <div>
        <input
          className='UserRegister_inputSolo'
          type="tel"
          name="tel"
          autoComplete="off"
          defaultValue=''
          ref={telRef}
          onChange={(e) => {
            setUserTel(e.target.value);
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              emailRef.current.focus();
            }
          }}
          placeholder='전화번호를 입력하세요.(- 제외)'
        />
      </div>
      <div>
        <input
          className='UserRegister_inputSolo'
          type="email"
          name="email"
          autoComplete="off"
          defaultValue=''
          ref={emailRef}
          onChange={(e) => {
            setUserEmail(e.target.value)
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              doneJob();
            }
          }}
          placeholder='이메일을 입력하세요.'
        />
      </div>
      <div className='UserRegister_inputDiv'>
        <input
          className='UserRegister_input'
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
            setUserAddr(addressRef.current.value);
          }}
          placeholder="우편번호 검색을 이용해주세요."
        />
        {/* 버튼 클릭 시 팝업 생성 */}
        <input
          value='우편번호 검색'
          type='button'
          className='UserRegister_overlap'
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
      <div className='UserRegister_error'>
        {errorMessage}
      </div>
      <div>
        <input
          value='등록하기'
          className='UserRegister_button'
          onClick={doneJob}
        />
      </div>
    </div>
  );
};

export default RegisterThird;