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
import { AuthProvider } from './context/AuthContext.jsx';


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
        path: '/car/:carId',
        element: <CarDetails/>,
      },
    ],
  },  
    ])
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
