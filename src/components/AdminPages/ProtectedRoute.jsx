import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ children, roles }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('https://car-rental-website-backend.onrender.com/api/v1/user/check-auth', {
          withCredentials: true,
        });
        setIsAuthenticated(response.data.isAuthenticated);
        setUserRole(response.data.user.role);
        console.log(response.data.user.role)
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated || (roles && !roles.includes(userRole))) {
    return <Navigate to="/user/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;
