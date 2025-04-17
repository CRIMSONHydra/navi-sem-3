// import { useState } from 'react'
import { Routes, Route } from "react-router-dom";

//css
import "./App.css";

//components
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Cart from "./components/Cart";
import UserProfile from "./components/UserProfile";
import WishList from "./components/WishList";
import Login from "./components/Login";
import UserProtectedRoutes from "./components/UserProtectedRoutes";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Protected routes(user auth) */}
        <Route path="/cart" element={
          <UserProtectedRoutes>
            <Cart />
          </UserProtectedRoutes>
        } />
        <Route path="/wishlist" element={
          <UserProtectedRoutes>
            <WishList />
          </UserProtectedRoutes>
        } />
        <Route path="/user" element={
          <UserProtectedRoutes>
            <UserProfile />
          </UserProtectedRoutes>
        } />
      </Routes>
    </>
  );
}

export default App;
