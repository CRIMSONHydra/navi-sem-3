import React, {useState, useEffect } from "react";

import { auth } from "../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

// context used to share auth state throughout the app
import { AuthContext } from "./AuthContextData";

export function AuthProvider({children}) {
  const [user, SetUser] = useState(null);

  useEffect(() => {
    //eventlistener for authenthication change
    const changeUser = onAuthStateChanged(auth, (currentUser) => {
      //default null if no user is signed in
      SetUser(currentUser);
    });

    return () => changeUser();
  }, []);

  const logOut = () => signOut(auth);

  return (
    <AuthContext.Provider value={{user, logOut}}>
      {children}
    </AuthContext.Provider>
  );
}
