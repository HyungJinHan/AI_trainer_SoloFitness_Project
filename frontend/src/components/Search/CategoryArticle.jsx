import React from "react";

const CategoryArticle = ({article}) => {
  return (
    <tr>
      <td>
        <img
          style={{width:"90px", height:"110px"}} 
          src={article.VIDEO_THUMBNAIL} alt="운동이미지" 
        />
      </td>
      <td>
        <p style={{fontSize:"25px"}}>{article.VIDEO_TITLE}</p>
        <p>{article.VIDEO_CATEOGRY}</p>
      </td>
    </tr>
  )
};

export default CategoryArticle;