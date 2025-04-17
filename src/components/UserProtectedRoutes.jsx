import React from 'react'

import {useAuth} from '../context/useAuth'
import { Navigate, useLocation } from 'react-router-dom';

function UserProtectedRoutes({children}) {
  const {user} = useAuth();
  const location = useLocation();
  
  if(!user) {
    console.log("not logged in, redirect")
    return <Navigate to="/login" state={{from:location}} replace />
  }

  console.log("logged in")
  return children;
}

export default UserProtectedRoutes