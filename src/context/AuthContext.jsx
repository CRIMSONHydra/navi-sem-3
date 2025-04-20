  import React, {useState, useEffect } from "react";

  import { auth, db } from "../../firebase"; //firebase.js
  import { onAuthStateChanged, signOut } from "firebase/auth";
  import { doc, setDoc, serverTimestamp, updateDoc, arrayUnion, arrayRemove, onSnapshot } from "firebase/firestore";

  // context used to share auth state throughout the app
  import { AuthContext } from "./AuthContextData";

  export function AuthProvider({children}) {
    const [user, setUser] = useState(null); //user from auth
    const [userData, setUserData] = useState(null); //userdata from firestore db
    const [loading, setLoading] = useState(true); //Indicates when user loading is done

    useEffect(() => {
      //save user data here realtime
      let unsubscribeFromUserDoc = () => {};


      //eventlistener for authenthication change
      const changeUser = onAuthStateChanged(auth, async (currentUser) => {
        //default null if no user is signed in
        setUser(currentUser);
        
        console.log("user changed", currentUser);
        if(currentUser) {
          //reference to 'users' document in firestore
          const userRef = doc(db, "users", currentUser.uid);
          
          unsubscribeFromUserDoc = onSnapshot(userRef, async userSnap => {
            if(!userSnap.exists()) {
              //create new doc if user data doesnt exist
              const newUser = {
                uid: currentUser.uid,
                email: currentUser.email,
                username: currentUser.displayName || "new user",
                phone: null,
                age: null,
                dob: null,
                address: "",
                cart: [], //store only productIds
                wishlist: [], //store only productIds
                createdAt: serverTimestamp()
              };
              
              await setDoc(userRef, newUser);
              setUserData(newUser);
            }
            else setUserData(userSnap.data());
          });
          
        } else {//user doesnt exist /invalid /logouted
          setUserData(null);
        }
        setLoading(false);

      });

      return () => {
        changeUser();
        unsubscribeFromUserDoc();
      }
    }, []);

    const logOut = () => signOut(auth);

    //user objext is stored in state now
    //CART functions
    const addToCart = async productId => {
      if(!user) return;

      const userRef = doc(db, "users", user.uid);
      //update firestore
      await updateDoc(userRef, {
        cart: arrayUnion(productId)
      });
      //update state
      setUserData(prev => ({
        ...prev,
        cart: [...prev.cart, productId]
      }));
    };

    const removeFromCart = async productId => {
      if (!user) return;
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        cart: arrayRemove(productId)
      });
      setUserData(prev => ({
        ...prev,
        cart: prev.cart.filter(id => id !== productId)
      }));
    };

    //WISHLIST functions
    const addToWishlist = async productId => {
      if (!user) return;
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        wishlist: arrayUnion(productId)
      });
      setUserData(prev => ({
        ...prev,
        wishlist: [...prev.wishlist, productId]
      }));
    };
  
    const removeFromWishlist = async productId => {
      if (!user) return;
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        wishlist: arrayRemove(productId)
      });
      setUserData(prev => ({
        ...prev,
        wishlist: prev.wishlist.filter(id => id !== productId)
      }));
    };



    return (
      <AuthContext.Provider value={{
        user, 
        userData, setUserData,
        loading,
        logOut,
        addToCart,
        removeFromCart,
        addToWishlist,
        removeFromWishlist
      }}>
        {children}
      </AuthContext.Provider>
    );
  }
