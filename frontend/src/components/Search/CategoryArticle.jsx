import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/CategoryNSearch/SearchArticle.css";

const CategoryArticle = ({ article, setmode }) => {
  const navigate = useNavigate();

  return (
    <div
      claasName='sa_total_div'
      onClick={() => navigate(`/detail?exec=${article.VIDEO_TITLE}`)}
    >
      <div className="sa_first_td">
        <img
          className="sa_first_td_img"
          src={article.VIDEO_THUMBNAIL}
          alt="운동이미지"
        />
      </div>
      <div className="sa_second_td">
        <p className="sa_videotitle">{article.VIDEO_TITLE}</p>
        <p className="sa_videocategory"># {article.VIDEO_CATEGORY}</p>
        <p className="sa_videowriter">{article.VIDEO_WRITER}</p>
      </div>
    </div>
  )
};

export default CategoryArticle;