  import React, {useState, useEffect } from "react";

  import { auth, db } from "../../firebase"; //firebase.js
  import { onAuthStateChanged, signOut } from "firebase/auth";
  import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

  // context used to share auth state throughout the app
  import { AuthContext } from "./AuthContextData";

  export function AuthProvider({children}) {
    const [user, setUser] = useState(null); //user from auth
    const [userData, setUserData] = useState(null); //userdata from firestore db

    useEffect(() => {
      //eventlistener for authenthication change
      const changeUser = onAuthStateChanged(auth, async (currentUser) => {
        //default null if no user is signed in
        setUser(currentUser);

        console.log("user changed", currentUser);
        if(currentUser) {
          //reference to 'users' document in firestore
          const userRef = doc(db, "users", currentUser.uid);
          //snapshot of userRef data
          const userSnap = await getDoc(userRef);

          if(!userSnap.exists()) {
            //create new doc if user data doesnt exist
            const newUser = {
              uid: currentUser.uid,
              email: currentUser.email,
              username: currentUser.displayName || "new user",
              age: null,
              dob: null,
              address: "",
              cart: [],
              wishlist: [],
              createdAt: serverTimestamp()
            };
          
            await setDoc(userRef, newUser);
            setUserData(newUser);
          }
          else setUserData(userSnap.data());

        } else {//user doesnt exist /invalid /logouted
          setUserData(null);
        }
      });

      return () => changeUser();
    }, []);

    const logOut = () => signOut(auth);

    return (
      <AuthContext.Provider value={{user, userData, logOut}}>
        {children}
      </AuthContext.Provider>
    );
  }
