import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/CategoryNSearch/CategoryArticle.css";

const CategoryArticle = ({article,setmode}) => {
  const navigate = useNavigate();

  return (
    <tr onClick={() => navigate(`/detail?exec=${article.VIDEO_TITLE}`)}>
      <td className="cl_first_td">
        <img
          src={article.VIDEO_THUMBNAIL} alt="운동이미지" 
        />
      </td>
      <td className="cl_second_td">
        <p style={{fontSize:"25px"}}>{article.VIDEO_TITLE}</p>
        <p>{article.VIDEO_CATEGORY}</p>
      </td>
    </tr>
  )
};

export default CategoryArticle;