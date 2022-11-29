import React from "react";
import CategoryArticle from "./CategoryArticle";

const CategoryList = ({categorylist}) => {
  return (
    <table>
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
  )
};

export default CategoryList;