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
import PrivateRoute from './components/PrivateRoute.jsx';
import PaymentSuccess from './components/PaymentSuccess.jsx';


const router = createBrowserRouter([
  {
    element: <HomeLayout/>,
    children: [
     
      {
        path: "/",
        element: <App/>,
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
        element: (
          <PrivateRoute><AdditionalRequirementsPage/></PrivateRoute>
        
        )
      
      },
      {
        path: '/user/orderpage',
        element: (
          <PrivateRoute><OrderPage/></PrivateRoute>
        
        ),
      },
      {
        path: "/success",
        element: (
          <PrivateRoute>
            <PaymentSuccess/>
          </PrivateRoute>
        ),
        }
    ],
  },  
  {
   
    
    
        element: <AdminLayout />,
        children: [
          {
            path: "/admin/dashboard",
            element: (
              <PrivateRoute> <AdminDashboard /></PrivateRoute>
            
            ),
            
          },
          {
            path: "/admin/users",
            element: (
              <PrivateRoute><Users /></PrivateRoute>
            
            ),
          
          },
          {
            path: "/admin/admin",
            element: (
              <PrivateRoute> <Users /></PrivateRoute>
            
            ),
          
               
              
          },
          {
            path: '/admin/users/:userId',
            element: (
              <PrivateRoute>  <UserDetails /></PrivateRoute>
            
            ),
      
              
              
          },
          {
            path: '/admin/admin/:userId',
            element: (
              <PrivateRoute><UserDetails /></PrivateRoute>
            
            ),
            
                
              
          },
          {
            path: "/admin/cars",
            element: (
              <PrivateRoute> <Cars /></PrivateRoute>
            
            ),
         
               
             
          },
          {
            path: "/admin/cars/:carId",
            element: (
              <PrivateRoute><CarDetailsAdmin/></PrivateRoute>
            
            ),
         
                
             
          },
          {
            path: "/admin/addcar",
            element: (
              <PrivateRoute> <AddCar/></PrivateRoute>
            
            ),
      
               
             
          },
          {
            path: "/admin/updatecar/:carId",
            element: (
              <PrivateRoute><UpdateCarForm/></PrivateRoute>
            
            ),
          
                
             
          },
          {
            path: "/admin/roleChange/:userId",
            element: (
              <PrivateRoute> <RoleChange/></PrivateRoute>
            
            ),
        
               
             
          },
          {
            path: "orders/:userId",
            element: (
              <PrivateRoute> <OrderDetails/></PrivateRoute>
            
            ),
          
               
             
          },
          {
            path: "/admin/offices",
            element: (
              <PrivateRoute> <Offices/></PrivateRoute>
            
            ),
        
               
             
          },
          {
            path: "/admin/offices/:officeId",
            element: (
              <PrivateRoute><OfficeDtails/></PrivateRoute>
            
            ),
         
                
                       },
          {
            path: "/admin/addoffice",
            element: (
              <PrivateRoute> <AddOfice/></PrivateRoute>
            
            ),
          
               
             
          },
          {
            path: "/admin/updateoffice/:officeId",
            element: (
              <PrivateRoute><UpdateOffice/></PrivateRoute>
            
            ),
                
             
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
