import React from 'react'
import { useNavigate } from 'react-router-dom';

import './login.css';

import { signInWithPopup } from 'firebase/auth';

//from firebase.js
import { auth, googleProvider } from '../../firebase';

function Login() {

  const navigate = useNavigate();

  async function handleLogin() {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/');
    } catch (error) {
      console.log("Google sign in error Login.jsx", error);
    }
  }

  return (
    <div className='container'>
      <h2 className='title'>Welcome</h2>
      <button onClick={handleLogin}>
        Sign in with Google
      </button>
    </div>
  )
}

export default Login