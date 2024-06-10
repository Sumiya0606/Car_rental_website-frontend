import React from 'react'
import Navbar from '../Navbar'
import { Outlet } from 'react-router-dom'
import { useTheme } from '../../context/themeContext.jsx'
import TopBar from '../TopBar'
import { useAuth } from '../../context/AuthContext'

const HomeLayout = () => {
    const { theme, setTheme } = useTheme();
    const {user}=useAuth();
  
  return (
    <>
      <div className=" items-center justify-center  ">
        <TopBar user={user}/>
    <nav>
    <Navbar theme={theme} setTheme={setTheme} />
     
    </nav>
    <Outlet/>
    </div>
  </>
  )
}
export default HomeLayout;