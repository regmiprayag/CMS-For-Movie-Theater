import React from 'react'
import { useNavigate, Link } from "react-router-dom"
import { toast } from 'react-toastify';
import {
  Routes,
  Route
} from "react-router-dom";
import * as pages from "../pages"

const Sidebar = () => {
  const navigate = useNavigate();
  const handleClick=()=>{
    navigate("/login/admin");
    toast.error("Logout Successfull");
    localStorage.removeItem("token");
    localStorage.removeItem("adminId");
  }

  return ( 
    <div className='flex w-full'>
    <div className="w-1/2 h-dvh bg-gray-900 text-white">
      <div className="p-6 h-dvh">
        <h1 className="text-2xl font-semibold mt-32 mx-2">Movies</h1>
        <ul className="mt-4 flex flex-col gap-3">
            <li className="p-2 hover:bg-gray-700">
                <Link to="/cms/dashboard" className="block">Dashboard</Link>
            </li>
            <li className="p-2 hover:bg-gray-700">
                <Link to="/cms/movies" className="block">All Movies</Link>
            </li>
            <li className="p-2 hover:bg-gray-700">
                <Link to="#" className="block">See Users</Link>
            </li>
            <li className="p-2 hover:bg-gray-700">
                <Link to="#" className="block">View</Link>
            </li>
            <li className="p-2 hover:bg-gray-700">
                <Link to="#" className="block">Settings</Link>
            </li>
            <li onClick={handleClick}  className="p-2 bg-red-800 hover:bg-gray-700 cursor-pointer">
                <button className="block">Logout</button>
            </li>
        </ul>
        {/* <button>Logout</button> */}
      </div>
    </div>

    {/* <div className='bg-pink-400'>
      hello ram
    </div> */}

    {/* <Routes>
      <Route path="/" element={<pages.home.Home/>}/>
      <Route path="movies" element={<pages.home.AllMovies/>}/>
    </Routes> */}
    </div>
  )
}

export default Sidebar