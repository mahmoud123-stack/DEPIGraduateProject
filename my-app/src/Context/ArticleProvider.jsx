import { useState } from "react";
import ArticleContext from "./ArticleContext";

export default function ArticleProvider({ children }) {
  const [GloblalArticle, setGlobalArticle] = useState(null);

  return (
    <ArticleContext.Provider value={{ GloblalArticle, setGlobalArticle }}>
      {children}
    </ArticleContext.Provider>
  );
}
