import { useContext } from "react";
import { SearchContext } from "./SearchContextData";

export const useSearch = () => {
  const context = useContext(SearchContext);
  if(!context) {
    throw new Error("Auth context error, useAuth.js");
  }
  return context;
}