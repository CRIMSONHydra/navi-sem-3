import { useContext } from "react";

//contains our auth state
import { AuthContext } from "./AuthContextData";

export const useAuth = () => {
  //returns value of the nearest AuthContext provider in component tree
  //useContext accesses current context value from Authcontext
  const contxt =  useContext(AuthContext);
  if(!contxt) {
    throw new Error("Auth context error, useAuth.js");
  }
  return contxt;
};
