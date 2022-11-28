import React from "react";
import { useNavigate } from "react-router-dom";

// SearchResult의 searchlist는 검색결과가 배열로 들어있고,
// article은 그 배열 안의 결과 하나하나를 의미 -> props로 받아옴
const SearchArticle = ({ article }) => {
  // const url = `/detail?exec=${article.VIDEO_TITLE}`;
  const navigate = useNavigate();

  return (
    <tr onClick={() => navigate("/detail")}>
      <td>
        <img
          style={{ width: "90px", height: "110px" }}
          src={article.VIDEO_THUMBNAIL}
          alt="운동이미지"
        />
      </td>
      <td>
        <p style={{ fontSize: "25px" }}>{article.VIDEO_TITLE}</p>
        <p>{article.VIDEO_CATEGORY}</p>
      </td>
    </tr>
  );
};

export default SearchArticle;
