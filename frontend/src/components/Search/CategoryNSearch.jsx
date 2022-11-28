import axios from 'axios';
import React, { useRef, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navigator from '../Navigator/Navigator';
import SearchResult from './SearchResult';

const Category = () => {
  const navigator = useNavigate();
  const SearchwordRef = useRef();
  const [SearchCount, setSearchCount] = useState(0);
  const [SearchWord, setSearchWord] = useState("");

  const [SearchList, setSearchList] = useState({ searchlist: [] })
  const [SearchArticle, setSearchArticle] = useState({
    "VIDEO_NUM": 0,
    "VIDEO_TITLE": "",
    "VIDEO_WRITER": "",
    "VIDEO_DATE": "",
    "VIDEO_ADDRESS": "",
    "VIDEO_CATEGORY": "",
    "VIDEO_THUMBNAIL": ""
  })
  //0은 카테고리, 1은 검색결과
  const [mode, setMode] = useState(0);

  function handleSearch(e) {
    if (SearchwordRef.current.value.length <= 1 || SearchwordRef.current.value === undefined) {
      alert("검색을 위해 두 글자 이상 입력해 주세요");
    } else {
      setMode(1);
      setSearchWord(SearchwordRef.current.value);
    }

    axios.post("http://localhost:8008/searchcount", {
      searchword: SearchwordRef.current.value
    }).then((res) => {
      console.log("handleSearch(count) ->", res);
      setSearchCount(res.data[0].COUNT);
    }).catch((e) => {
      console.error(e);
    });
    axios.post("http://localhost:8008/Search", {
      searchword: SearchwordRef.current.value
    }).then((res) => {
      console.log("handleSearch(res) -> ", res)
      const { data } = res;
      if (data.length > 0) {
        setSearchList({ searchlist: data })
      } else if (data.length === 0) {
        alert("검색 결과가 없습니다.")
        setMode(0);
      }
    }).catch((e) => {
      console.error(e);
    });
  }

  const items = [{
    category: "요가",
    thumb: "https://cdn-icons-png.flaticon.com/512/2043/2043775.png"
  },
  {
    category: "스트레칭",
    thumb: "https://cdn-icons-png.flaticon.com/128/755/755295.png"
  },
  {
    category: "기구운동",
    thumb: "https://cdn-icons-png.flaticon.com/128/7126/7126790.png"
  },
  {
    category: "맨몸운동",
    thumb: "https://cdn-icons-png.flaticon.com/512/2983/2983018.png"
  }]

  if (mode === 0) {
    return (
      <div>
        <input type="button" onClick={() => { navigator("/usermain") }} value="메인으로 돌아가기" />
        <div>
          <input type="text" placeholder="검색어를 입력하세요" ref={SearchwordRef} />
          <input
            type="button"
            value="검색"
            onClick={handleSearch}
          />
        </div>
        <div style={{
          // margin: "50px",
          padding: "20px",
          paddingBottom: '0px',
          width: "480px",
          display: "grid",
          gridTemplateRows: "1fr",
          gridTemplateColumns: "1fr 1fr 1fr",
        }}>
          {items.map((item) => {
            return <div style={{ margin: "20px 10px", backgroundColor: "lightblue", height: "120px", borderRadius: "50%" }}>
              <div>
                <img src={item.thumb} alt="카테고리 이미지"
                  style={{ width: "100px", height: "100px" }} />
              </div>
              <p style={{ textAlign: "center" }}>{item.category}</p>
            </div>
          })}
        </div>
        <Navigator />
        <Outlet />
      </div>
    )
  } else if (mode === 1) {
    return (
      <SearchResult searchword={SearchWord} searchcount={SearchCount} searchlist={SearchList} />
    )
  }
};

export default Category;