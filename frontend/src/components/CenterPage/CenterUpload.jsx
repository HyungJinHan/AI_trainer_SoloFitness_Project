import axios from "axios";
import React, {useRef} from "react";

const CenterUpload = (props) => {
  const titleRef = useRef();
  const categoryRef = useRef();
  const infoRef = useRef();
  const effectRef = useRef();
  const addressRef = useRef();

  function handleUpload() {
    axios.post("http://localhost:8008/centerupload", {
      title: titleRef.current.value,
      category: categoryRef.current.value,
      info: infoRef.current.value,
      effect: effectRef.current.value,
      address: addressRef.current.value
    }).then((res) => {
      console.log("handleUpload(res)->",res);
    }).catch((e) => {
      console.error(e);
    })
  }

  return (
    <div>
      <div>
        <input
          type='button'
          value='돌아가기'
          onClick={() => {
            props.setMode(0);
          }}
        />
      </div>
      <div className="ctupload_upload_div">
        <div>
          <div>타이틀</div>
          <div><input type="text" ref={titleRef} /></div>
        </div>
        <div>
          <div>카테고리</div>
          {/* <div><input type="text" ref={categoryRef} /></div> */}
          <div>
            <select ref={categoryRef}>
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
        </div>
        <div>
          <div>운동소개</div>
          <div><textarea ref={infoRef}/></div>
        </div>
        <div>
          <div>운동효과</div>
          <div><textarea ref={effectRef} /></div>
        </div>
        <div>
          <div>파일 첨부</div>
          <div><input type="text" ref={addressRef} placeholder="해당 영상의 url 입력" /></div>
        </div>
        <div>
          <input type="button" value="동영상 업로드" />
        </div>
      </div>
    </div>
  )
};

export default CenterUpload;