import React from "react";
import CategoryArticle from "./CategoryArticle";
import "../../styles/CategoryNSearch/SearchResult.css";

const CategoryList = ({ categorylist, item }) => {
  return (
    <div className="sr_div">
      <div className="sr_text">
        <p>{item} 카테고리</p>
      </div>
      <div>
        <table className="search_tbl">
          <tbody>
            {categorylist.categorylist.map((article) => {
              return <CategoryArticle article={article} />;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryList;
