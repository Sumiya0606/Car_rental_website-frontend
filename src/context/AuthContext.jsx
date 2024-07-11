// src/context/AuthContext.js
import React, { createContext, useContext, useState,useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem('token'));

    useEffect(() => {
      const savedToken = localStorage.getItem('token');
      if (savedToken) {
        setToken(savedToken);
      }
    }, []);
    const [user, setUser] = useState(() => {
      const savedUser = localStorage.getItem('user');
      console.log("Saved User:", savedUser); 
      return savedUser ? JSON.parse(savedUser) : null;
    });
  

    const login = (username,id,token) => {
      const userData = { username, id };
      const usrtoken={token};
      setUser(userData);
      setToken(usrtoken)
      console.log("Login User Data:", userData);
      console.log("Login User token:", usrtoken);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', token);
    };

    const logout = async () => {
        try {
          const response = await axios.get('https://car-rental-website-backend.onrender.com/api/v1/user/logout'); // Ensure this URL matches your backend route
            if (response.data.success) {
                setUser(null); // Clear the user state
                localStorage.removeItem('user'); // Clear the user from localStorage
                localStorage.removeItem('token');
                window.location.href = '/user/signin'; // Redirect to the sign-in page
            }
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user,token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

