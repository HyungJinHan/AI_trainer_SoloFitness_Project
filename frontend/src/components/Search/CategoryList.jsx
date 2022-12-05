import React from "react";
import CategoryArticle from "./CategoryArticle";
import "../../styles/CategoryNSearch/CategoryList.css";

const CategoryList = ({ categorylist, item }) => {
  return (
    <div className="cl_div">
      <div className="cl_text">
        <p>{item} 카테고리</p>
        <table className="search_tbl" width="90%">
          <tbody>
            {categorylist.categorylist.map((article) => {
              return (
                <CategoryArticle
                  article={article}
                />
              )
            })}
          </tbody>
        </table>
      </div>
    </div>

  )
};

export default CategoryList;