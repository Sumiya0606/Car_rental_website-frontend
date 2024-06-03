import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import SignUp from './components/SignUp.jsx';
import SignIn from './components/SignIn.jsx';
const router = createBrowserRouter([
  {    
        path: "user/signup",
        element: <SignUp/>,
      
  },
  {     
    path: "user/signin",
    element: <SignIn/>,
  
}
    ])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
 <RouterProvider router={router} />
  </React.StrictMode>,
)
