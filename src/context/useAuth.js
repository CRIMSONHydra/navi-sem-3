import { useContext } from "react";

//contains our auth state
import { AuthContext } from "./AuthContextData";

const useAuth = () => {
  //returns value of the nearest AuthContext provider in component tree
  //useContext accesses current context value from Authcontext
  return useContext(AuthContext);
};

export default useAuth;
