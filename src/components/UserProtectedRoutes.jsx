import React from 'react'

import {useAuth} from '../context/useAuth'
import { Navigate } from 'react-router-dom';

function UserProtectedRoutes({children}) {
  const user = useAuth();
  
  if(!user) {
    return <Navigate to="/login" state={{from:location}} replace />
  }

  return children;
}

export default UserProtectedRoutes