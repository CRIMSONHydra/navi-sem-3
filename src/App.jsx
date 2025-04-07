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

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/user" element={<UserProfile />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
