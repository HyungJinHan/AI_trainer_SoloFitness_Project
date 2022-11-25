import React from "react";

// SearchResult의 searchlist는 검색결과가 배열로 들어있고,
// article은 그 배열 안의 결과 하나하나를 의미 -> props로 받아옴
const SearchArticle = ({ article }) => {
  return (
    <tr key={article.video_num}>
      <td>
        <img
          style={{ width: "90px", height: "110px" }}
          src="https://images.pexels.com/photos/6550839/pexels-photo-6550839.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="운동이미지"
        />
      </td>
      <td>
        <p style={{ fontSize: "25px" }}>{article.video_title}</p>
        <p>{article.video_category}</p>
      </td>
    </tr>
  );
};

export default SearchArticle;
