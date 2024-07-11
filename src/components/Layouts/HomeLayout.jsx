import React from 'react'
import Navbar from '../Navbar'
import { Outlet } from 'react-router-dom'

import TopBar from '../TopBar'
import { useAuth } from '../../context/AuthContext'
import { useState,useEffect } from 'react'
import { useTheme } from '../../context/themeContext'
const HomeLayout = () => {

  const [theme, setTheme] = React.useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  const element = document.documentElement;

  React.useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);
    const {user}=useAuth();
  
  return (
    <>
      <div className=" items-center justify-center  ">
        <TopBar user={user}/>
    <nav>
    <Navbar theme={theme} setTheme={setTheme} />
     
    </nav>
    <div className='ml-4'>
    <Outlet/>
    </div>
   
    </div>
  </>
  )
}
export default HomeLayout;