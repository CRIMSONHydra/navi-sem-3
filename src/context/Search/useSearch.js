import { useContext } from "react";
import { SearchContext } from "./SearchContextData";

export const useSearch = () => {
  const context = useContext(SearchContext);
  if(!context) {
    throw new Error("Search context error, useSearch.js");
  }
  return context;
}