import axios from 'axios';
import React, { useRef, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import SearchResult from './SearchResult';
import CategoryList from './CategoryList';
import Navigator from "../Navigator/Navigator";
import "../../styles/CategoryNSearch/CategoryNSearch.css";
import search1 from '../../static/images/HHJ/Navigator/search_white.svg';

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
  const [categoryList, setCategoryList] = useState({ categorylist: [] })
  const [categoryArticle, setcategoryArticle] = useState({
    VIDEO_TITLE: "",
    VIDEO_CATEGORY: "",
    VIDEO_THUMBNAIL: ""
  })
  //0은 카테고리, 1은 검색결과, 2는 카테고리 리스트
  const [mode, setMode] = useState(0);

  /* 검색창에서 검색하는 함수 */
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

  /* 카테고리 */
  const items = [{
    category: "하체",
    thumb: "032-icon-185611.png"
  },
  {
    category: "상체",
    thumb: "006-icon-185584.png"
  },
  {
    category: "기구운동",
    thumb: "044-icon-763964.png"
  },
  {
    category: "맨몸운동",
    thumb: "004-icon-185617.png"
  },
  {
    category: "요가",
    thumb: "045-icon-763960.png"
  },
  {
    category: "스트레칭",
    thumb: "025-icon-185601.png"
  },
  {
    category: "전신운동",
    thumb: "009-icon-185612.png"
  },
  {
    category: "필라테스",
    thumb: "017-icon-185605.png"
  },
  {
    category: "유산소",
    thumb: "005-icon-185599.png"
  }]

  /* mode:2로 넘어가 카테고리 리스트가 뜰 때 무슨 카테고리인지 알려주기 위해 item을 넘겨줄 것 */
  const [item,setItem] = useState("")

  /* node js에 empty items 뜨면서 null이 받아와지기 때문에 한 번에 불가 */
  // function handleCategory() {
  //   axios.post("http://localhost:8008/category", { categories: items })
  //     .then((datalist) => {
  //       console.log("category(datalist)->", datalist);
  //       setCategoryList({ categorylist: datalist.data })
  //     }).catch((e) => {
  //       console.error(e);
  //     })
  // }

  // 여기서부터 카테고리 하나씩 해당 목록 불러오는 함수 만들 것
  function categoryLower() {
    axios.post("http://localhost:8008/onecategory", {category:"하체"})
    .then((res) => {
      // console.log("lower(res)->",res)
      setCategoryList({categorylist:res.data})
      setMode(2)
    }).catch((e) => {
      console.error(e);
    });
  };
  function categoryUpper() {
    axios.post("http://localhost:8008/onecategory", {category:"상체"})
    .then((res) => {
      // console.log("upper(res)->",res)
      setCategoryList({categorylist:res.data})
      setMode(2)
    }).catch((e) => {
      console.error(e);
    });
  };
  function categoryEquip() {
    axios.post("http://localhost:8008/onecategory", {category:"기구운동"})
    .then((res) => {
      // console.log("equip(res)->",res)
      setCategoryList({categorylist:res.data})
      setMode(2)
    }).catch((e) => {
      console.error(e);
    });
  };
  function categoryBarebody() {
    axios.post("http://localhost:8008/onecategory", {category:"맨몸운동"})
    .then((res) => {
      // console.log("barebody(res)->",res)
      setCategoryList({categorylist:res.data})
      setMode(2)
    }).catch((e) => {
      console.error(e);
    });
  };
  function categoryYoga() {
    axios.post("http://localhost:8008/onecategory", {category:"요가"})
    .then((res) => {
      // console.log("yoga(res)->",res)
      setCategoryList({categorylist:res.data})
      setMode(2)
    }).catch((e) => {
      console.error(e);
    });
  };
  function categoryStretch() {
    axios.post("http://localhost:8008/onecategory", {category:"스트레칭"})
    .then((res) => {
      // console.log("stretching(res)->",res)
      setCategoryList({categorylist:res.data})
      setMode(2)
    }).catch((e) => {
      console.error(e);
    });
  };
  function categoryFullbody() {
    axios.post("http://localhost:8008/onecategory", {category:"전신운동"})
    .then((res) => {
      // console.log("fullbody(res)->",res)
      setCategoryList({categorylist:res.data})
      setMode(2)
    }).catch((e) => {
      console.error(e);
    });
  };
  function categoryPilates() {
    axios.post("http://localhost:8008/onecategory", {category:"필라테스"})
    .then((res) => {
      // console.log("pilates(res)->",res)
      setCategoryList({categorylist:res.data})
      setMode(2)
    }).catch((e) => {
      console.error(e);
    });
  };
  function categoryAerobic() {
    axios.post("http://localhost:8008/onecategory", {category:"유산소"})
    .then((res) => {
      // console.log("aerobic(res)->",res)
      setCategoryList({categorylist:res.data})
      setMode(2)
    }).catch((e) => {
      console.error(e);
    });
  };

  if (mode === 0) {
    return (
      <div className='CNS_search_main'>
        {/* <input
          type="button"
          onClick={() => { navigator("/usermain") }}
          value="메인으로 돌아가기"
        /> */}
        <div className='CNS_search_info'>
          검색
        </div>
        <div className="CNS_search_div">
          <input
            className='CNS_search_input'
            type="text"
            placeholder="검색어를 입력하세요"
            ref={SearchwordRef}
          />
          <button
            className="CNS_search_button"
            onClick={handleSearch}
          >
            <img src={search1} alt="돋보기" />
          </button>
        </div>
        <div className='CNS_grid_category'>
          <div
            className="CNS_grid_div"
          // onClick={() => {
          //   handleCategory();
          //   setMode(2);
          // }}
        >
          {items.map((item, index) => {
            return (
            <div className="CNS_category_item" 
              key={index}
              onClick={() => {
                if (index === 0) {
                  categoryLower();
                  setItem("하체")
                } else if (index === 1) {
                  categoryUpper();
                  setItem("상체")
                } else if (index === 2) {
                  categoryEquip();
                  setItem("기구운동")
                } else if (index === 3) {
                  categoryBarebody();
                  setItem("맨몸운동")
                } else if (index === 4) {
                  categoryYoga();
                  setItem("요가")
                } else if (index === 5) {
                  categoryStretch();
                  setItem("스트레칭")
                } else if (index === 6) {
                  categoryFullbody();
                  setItem("전신운동")
                } else if (index === 7) {
                  categoryPilates();
                  setItem("필라테스")
                } else if (index === 8) {
                  categoryAerobic();
                  setItem("유산소")
                }
              }}
            >              
              <div className="CNS_image">
                <img src={require(`../../static/images/JYY/ICON/mycollection/png/${item.thumb}`)} alt="카테고리 이미지" />
              </div>
              <p>{item.category}</p>
            </div>
            )
          })}
        </div>
        <Navigator />
        <Outlet />
      </div>
    )
  } else if (mode === 1) {
    return (
      <div>
        <SearchResult searchword={SearchWord} searchcount={SearchCount} searchlist={SearchList} />
        <Navigator searchMode={mode} setSearchMode={setMode}/>
        <Outlet />
      </div>
    )
  } else if (mode === 2) {
    return (
      <div>
        <CategoryList categorylist={categoryList} item={item} />
        <Navigator searchMode={mode} setSearchMode={setMode}/>
        <Outlet />
      </div>
    )
  }
};

export default Category;