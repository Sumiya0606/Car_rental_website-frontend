import React from 'react'
import { Outlet } from 'react-router-dom'
import NavbarAdmin from '../NavbarAdmin'

function AdminLayout() {
  return (
    <div>

            <NavbarAdmin/>
            <Outlet/>

    </div>
  )
}

export default AdminLayout