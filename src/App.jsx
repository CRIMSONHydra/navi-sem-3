// import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

//css
import "./App.css";

//components
import Navbar from "./components/Navbar";
import UserProtectedRoutes from "./components/UserProtectedRoutes";
import Loading from "./components/Loading";

//lazy imports
const Home = lazy(() => import('./pages/Home'));
const Cart = lazy(() => import('./pages/Cart'));
const UserProfile = lazy(() => import('./pages/UserProfile'));
const WishList = lazy(() => import('./pages/WishList'));
const Login = lazy(() => import('./pages/Login'));

function App() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<Loading />}>
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
      </Suspense>
    </>
  );
}

export default App;
