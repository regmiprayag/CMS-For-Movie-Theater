import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"

export const Navbar = () => {
    const isAdminLoggedIn = useSelector((state)=>state.user.isLoggedIn);
  console.log("Is admin loggedin ",isAdminLoggedIn);
  return (
    <div className="py-2 absolute top-0 left-0 right-0">
    <nav className="sticky top-0 left-0 flex items-center text-white justify-between px-4 py-2 sm:px-20">
        <div className="">
            <img
                src="https://bigmovies.com.np/Modules/Logo/image/Big%20Movies%20logo%20-%20Copy_736038.jpg"
                alt="bigmovies"
            />
        </div>
        <div>
            <ul className="flex gap-12">
                <li className="hover:text-red-400">
                    <Link to="/cms/dashboard">HOME</Link>
                </li>
                <li className="hover:text-red-400">
                    <Link to="/admin/career">CAREER</Link>
                </li>
                <li className="hover:text-red-400">
                    <Link to="/admin/contact">CONTACT</Link>
                </li>
                <li className="hover:text-red-400">
                    <Link to="/admin/ticket-rate">TICKET RATE</Link>
                </li>
                <li className="hover:text-red-400">
                    <Link to="/admin/dashboard">DASHBOARD</Link>
                </li>
                
            </ul>
        </div>
        {isAdminLoggedIn && <>
                        
        <div className="gap-5">
            <Link to="/">
                <button className="bg-yellow-500 text-black text-lg mx-2 px-3 py-2 rounded-lg hover:bg-yellow-600">
                    Logout
                </button>
            </Link>
        </div>
        </>}
    </nav>
</div>

  )
}
