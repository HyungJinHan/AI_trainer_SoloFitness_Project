import axios from 'axios';
import React, {useRef,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import SearchResult from './SearchResult';

const Category = () => {
  const navigator = useNavigate();
  const SearchwordRef = useRef();
  const [SearchCount, setSearchCount] = useState(0);
  const [SearchWord, setSearchWord] = useState("");

  const [SearchList, setSearchList] = useState({searchlist:[]})
  const [SearchArticle, setSearchArticle] = useState({
    "VIDEO_NUM":0,
    "VIDEO_TITLE":"",
    "VIDEO_WRITER":"",
    "VIDEO_DATE":"",
    "VIDEO_ADDRESS":"",
    "VIDEO_CATEGORY":"",
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

    axios.post("http://localhost:8008/searchcount" ,{
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
      const {data} = res;
      if (data.length > 0) {
        setSearchList({searchlist:data})
      } else if (data.length === 0) {
        alert("검색 결과가 없습니다.")
        setMode(0);
      }
    }).catch((e) => {
      console.error(e);
    });
  }
  
  if (mode === 0) {
    return (
      <div>
        <input type="button" onClick={()=>{navigator("/")}} value="메인으로 돌아가기" />
        <div>
          <input type="text" placeholder="검색어를 입력하세요" ref={SearchwordRef}/>
          <input 
            type="button" 
            value="검색" 
            onClick={handleSearch}
          />
        </div>
        <div>카테고리1</div>
      </div>
    )
  } else if (mode === 1) {
    return (
      <SearchResult searchword={SearchWord} searchcount={SearchCount} searchlist={SearchList}/>
    )
  }
};

export default Category;