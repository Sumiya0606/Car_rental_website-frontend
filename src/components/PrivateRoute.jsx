import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
    const { user ,token} = useAuth();

  return token ? children : <Navigate to="/user/signin" />;
};

export default PrivateRoute;