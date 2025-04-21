import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import Logo from "../assets/Logo.png";
import "./navbar.css";

//firebase.js
import { auth } from "../../firebase";

import { signOut } from "firebase/auth";
//contexts
import { useAuth } from "../context/useAuth";
import { useSearch } from "../context/Search/useSearch";

function Navbar() {
  const [dropDown, setDropDown] = useState(false); //profile section
  const [menuOpen, setMenuOpen] = useState(false);
  //contexts
  const { searchTerm, setSearchTerm } = useSearch();
  const { user, userData } = useAuth();

  //disable searchbar based on route
  const location = useLocation();
  const isHomePage = location.pathname === "/" || location.pathname === "";

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log("sign out error Navbar.jsx", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="logo">
          <img src={Logo} alt="Logo" />
        </Link>

        <button
          className="hamburger"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          ☰
        </button>

        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          {isHomePage && (
            <input
              type="text"
              placeholder="Search...."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          )}
        </div>
      </div>

      <div className="user-section">
        {/*Show user section if signed in otherwise sign in option */}
        {user ? (
          <div className="user-dropdown" onClick={() => setDropDown(!dropDown)}>
            <img
              src={user.photoURL || "../assets/default-user.jpg"}
              className="profile-pic"
              alt="Profile"
            />
            <span>{userData?.username}</span>
            {dropDown && (
              <ul className="dropdown-menu">
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/cart">Cart</Link></li>
                <li><Link to="/wishlist">Wish List</Link></li>
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
