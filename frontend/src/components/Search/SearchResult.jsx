import React from 'react';
import { useNavigate } from 'react-router-dom';
import SearchArticle from './SearchArticle';
import "../../styles/CategoryNSearch/SearchResult.css";

/** CategoryNSearch에서 검색어(searchword), 검색결과개수(searchcount), 검색결과(searchlist)를 props로 넘겨받음*/
const SearchResult = ({ searchword, searchcount, searchlist }) => {
  return (
    <div className="sr_div">
      <div className="sr_text">{searchword} 검색 결과</div>
      <p>{searchcount}개의 운동</p>

      {/* 검색 결과가 많아져 테이블이 길어질 때 스크롤 만들기 위해 div로 감싸서 스타일 준 것 */}
      <div style={{ height: "600px", overflowY: "scroll" }}>
        <table className="search_tbl" width="90%">
          <tbody>
            {searchlist.searchlist.map((article) => {
              return (
                <SearchArticle
                  article={article}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
};

export default SearchResult;