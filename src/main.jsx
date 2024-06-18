import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import SignUp from './components/SignUp.jsx';
import SignIn from './components/SignIn.jsx';
import HomeLayout from './components/Layouts/HomeLayout.jsx'
import Hero from './components/Hero.jsx';
import { ThemeProvider } from './context/themeContext.jsx';

import { ChakraProvider } from '@chakra-ui/react';
import Hero1 from './components/Hero1.jsx';
import CarDetails from './components/CarDetailsPage.jsx';
import CarByLocation from './components/CarByLocation.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';
import AdminLayout from './components/Layouts/AdminLayout.jsx';
import Users from './components/AdminPages/Users.jsx';
import UserDetails from './components/AdminPages/UserDetails.jsx';
import Cars from './components/AdminPages/Cars.jsx';
import ProtectedRoute from './components/AdminPages/ProtectedRoute.jsx';


const router = createBrowserRouter([
  {
    element: <HomeLayout/>,
    children: [
     
      {
        path: "/",
        element: <Hero />,
      },
     

      {
        path: "/user/signup",
        element: <SignUp />,
      },
      {
        path: "/user/signin",
        element: < SignIn/>,
      },
      {
        path: "/user/cars",
        element: < Hero1/>,
      },
      {
        path: "/user/carsbylocation",
        element: <CarByLocation/>,
      },
      {
        path: '/car/:carId',
        element: <CarDetails/>,
      },
    ],
  },  
  {
   
    
    
        element: <AdminLayout />,
        children: [
          {
            path: "/admin/dashboard",
            element:<AdminDashboard />,
          },
          {
            path: "/admin/users",
            element:
                <Users />
             ,
          },
          {
            path: "/admin/admin",
            element:
                <Users />
              
          },
          {
            path: '/admin/users/:userId',
            element:
                <UserDetails />
              
          },
          {
            path: '/admin/admin/:userId',
            element:
                <UserDetails />
              
          },
          {
            path: "/admin/cars",
            element:
                <Cars />
             
          },
          {
            path: "/admin/cars/:carId",
            element:
                <CarDetails />
             
          },
        ],
      },
    ]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
      <ChakraProvider>
    <RouterProvider router={router} />
    </ChakraProvider>
    </AuthProvider>
    </ThemeProvider>

  </React.StrictMode>,
)
