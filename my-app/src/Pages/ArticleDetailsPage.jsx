import React, { useContext } from "react";
import ArticleContext from "../Context/ArticleContext";
import "../Components/Blog.css";
export default function ArticleDetailsPage() {
  const { GloblalArticle } = useContext(ArticleContext);
  console.log(GloblalArticle);
  return (
    <div className="ArticleDetailsPage">
      <div className="container">
        <div className="header">
          <span>Article {GloblalArticle.id}</span>
          <h2>{GloblalArticle.title}</h2>
          <div className="info">
            <p>
              {" "}
              <span>🌟Brief :- </span>{" "}
              {GloblalArticle.summary || GloblalArticle.brief}
              <br />
            </p>
            <span>Category :- {GloblalArticle.category}</span>
          </div>
        </div>

        <div className="content">
          <p>
            {GloblalArticle.content}
            {GloblalArticle.content}
            {GloblalArticle.content}
          </p>
          <span>
            {GloblalArticle.tags.map((tag) => {
              return <span>{tag}</span>;
            })}
          </span>
        </div>
      </div>
    </div>
  );
}
