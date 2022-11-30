import React from "react";
import CategoryArticle from "./CategoryArticle";
import "../../styles/CategoryNSearch/CategoryList.css";

const CategoryList = ({categorylist, item}) => {
  return (
    <div className="cl_div">
      <div className="cl_text">
        <p>{item} 카테고리</p>
      </div>
      <div style={{height:"630px",overflowY:"scroll"}}>
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