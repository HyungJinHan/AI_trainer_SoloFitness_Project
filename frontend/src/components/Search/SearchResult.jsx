import React from 'react';
import { useNavigate } from 'react-router-dom';
import SearchArticle from './SearchArticle';

// CategoryNSearch에서 
// 검색어(searchword), 검색결과개수(searchcount), 검색결과(searchlist)를 
// props로 넘겨받음
const SearchResult = ({searchword, searchcount, searchlist}) => {
  return(
    <div>
      <div>{searchword} 검색 결과</div>
      {searchcount}개의 운동
      <table className="search_tbl">
        <tbody>
          {searchlist.searchlist.map((article) => {
            return(
              <SearchArticle
                article={article}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  )
};

export default SearchResult;