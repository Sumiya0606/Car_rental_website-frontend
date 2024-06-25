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
import { SearchProvider } from './context/SearchContext.jsx';
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
import OrderDetails from './components/AdminPages/OrderDetails.jsx';
import RoleChange from './components/AdminPages/RoleChange.jsx';
import CarDetailsAdmin from './components/AdminPages/CarDetailsAdmin.jsx';
import AddCar from './components/AdminPages/AddCar.jsx';
import UpdateCarForm from './components/AdminPages/UpdateCarForm.jsx';
import Offices from './components/AdminPages/Offices.jsx';
import AddOfice from './components/AdminPages/AddOfice.jsx';
import OfficeDtails from './components/AdminPages/OfficeDtails.jsx';
import UpdateOffice from './components/AdminPages/UpdateOffice.jsx';
import CarOrderPage1 from './components/CarOrderPage1.jsx';
import AdditionalRequirementsPage from './components/AdditionalRequirementPage.jsx';
import OrderPage from './components/OrderPage.jsx';
import About from './components/About.jsx';


const router = createBrowserRouter([
  {
    element: <HomeLayout/>,
    children: [
     
      {
        path: "/",
        element: <Hero />,
      },
      {
        path: "/about",
        element: <About/>,
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
        path: "/user/carsbylocation/:city",
        element: <CarByLocation/>,
      },
      {
        path: '/car/:carId',
        element: <CarDetails/>,
      },
      {
        path: 'user/carorder1/:carId',
        element: <CarOrderPage1/>,
      },
      {
        path: '/user/order/requirements',
        element: <AdditionalRequirementsPage/>,
      },
      {
        path: '/user/orderpage',
        element: <OrderPage/>,
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
                <CarDetailsAdmin/>
             
          },
          {
            path: "/admin/addcar",
            element:
                <AddCar/>
             
          },
          {
            path: "/admin/updatecar/:carId",
            element:
                <UpdateCarForm/>
             
          },
          {
            path: "/admin/roleChange/:userId",
            element:
                <RoleChange/>
             
          },
          {
            path: "orders/:userId",
            element:
                <OrderDetails/>
             
          },
          {
            path: "/admin/offices",
            element:
                <Offices/>
             
          },
          {
            path: "/admin/offices/:officeId",
            element:
                <OfficeDtails/>
                       },
          {
            path: "/admin/addoffice",
            element:
                <AddOfice/>
             
          },
          {
            path: "/admin/updateoffice/:officeId",
            element:
                <UpdateOffice/>
             
          },
          
         
        ],
      },
    ]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
      <ChakraProvider>
        <SearchProvider>
    <RouterProvider router={router} />
    </SearchProvider>
    </ChakraProvider>
    </AuthProvider>
    </ThemeProvider>

  </React.StrictMode>,
)
