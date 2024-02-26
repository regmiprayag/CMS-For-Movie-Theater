import React from 'react'
import { Navbar } from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { Outlet } from "react-router-dom"

const DefultLayout = () => {
  return (
    // <div className='bg-red-400 p-4 text-white'>DefultLayout</div>
    <div>   
        <Navbar/>
        <div className='flex'>
          <Sidebar/>
          <Outlet/>
        </div>
    </div>
  )
}

export default DefultLayout