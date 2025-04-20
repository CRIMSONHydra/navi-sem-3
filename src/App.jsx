// import { useState } from 'react'
import { Routes, Route } from "react-router-dom";

//css
import "./App.css";

//components
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import UserProfile from "./pages/UserProfile";
import WishList from "./pages/WishList";
import Login from "./pages/Login";
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
        <Route path="/profile" element={
          <UserProtectedRoutes>
            <UserProfile />
          </UserProtectedRoutes>
        } />
      </Routes>
    </>
  );
}

export default App;
