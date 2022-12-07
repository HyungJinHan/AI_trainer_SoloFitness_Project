import React from "react";
import CategoryArticle from "./CategoryArticle";
import "../../styles/CategoryNSearch/CategoryList.css";

const CategoryList = ({ categorylist, item }) => {
  return (
    <div className="cl_div">
      <div className="cl_text">
        {item} 카테고리
      </div>
      <div>
        <table className="category_tbl">
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