import React, { useState } from "react";
import { Link } from "react-router-dom";

//assets
import Logo from "../assets/placeholder-logo.jpg";
import "./navbar.css";

//auth
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import useAuth from "../context/useAuth";

function Navbar() {
  const [input, setInput] = useState("Search...");
  const [dropDown, setDropDown] = useState(false);

  //from context
  const { user } = useAuth();

  function clearSearch() {
    //clear search field on first click
    if (input == "Search...") setInput("");
  }

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch(error) {
      console.log("sign out error Navbar.jsx", error);
    }
  }

  return (
    <nav>
      <div className="nav-left">
        <div>
          <Link to="/">
            <img src={Logo} />
          </Link>
        </div>

        {/* Nav components */}
        <div className="nav-links">
          <Link to="/">Home</Link>
        </div>

        <div>
          <input
            type="text"
            value={input}
            onClick={clearSearch}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
      </div>

      <div className="user-section">
        {/* If User is logged in then show profile pic and other user accessible pages otherwise sign in page */}
        {user ? (
          <div className="user-dropdown" onClick={() => setDropDown(!dropDown)}>
            <img
              src={user.photo || "../assets/default-user.jpg"}
              alt="user profile"
              className="profile-pic"
            />
            {dropDown && (
              <ul className="dropdown-menu">
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/cart">Cart</Link>
                </li>
                <li>
                  <Link to="/wishlist">Wish List</Link>
                </li>
                <li onClick={handleSignOut}>Sign Out</li>
              </ul>
            )}
          </div>
        ) : (
          <div className="sign-in">
            <Link to="/login">Sign in</Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
