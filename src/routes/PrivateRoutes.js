import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { userActions } from "../store";
import { toast } from "react-toastify";
import { adminDetails } from "../api-helpers/api";

const PrivateRoute = ({ element }) => {
    // get user information
    const user = useSelector((state) => state.user.value);
    const [userData, setUserData] = useState({});

    const navigate = useNavigate()
    // const dispatch = useDispatch()

    const loadDataAndSetInfo = async () => {
        await adminDetails().then((res) => 
            // setUserData(res)
            console.log(res)
        ).catch(err => console.log(err));
    }

    useEffect(() => {
        if (Object.keys(user).length === 0) {
            const token = localStorage.getItem('token');
            if (token) {
                // toast.success("Please login to continue!");
                loadDataAndSetInfo();
            } else {
                toast.error("Please login to continue !");
                navigate('/login/admin')
            }
        } else {
            console.log("User Authenticated!");
        }
    }, [user])

    return element;
}

export default PrivateRoute



// import { Navbar } from '../components/Navbar';
// import Sidebar from '../components/Sidebar';
// import React from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import * as pages from '../pages';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useSelector } from 'react-redux';

// const PrivateRoute = ({ element, ...rest }) => {
//   const isAdminLoggedIn = useSelector((state) => state.user.isLoggedIn);

//   return isAdminLoggedIn ? element : <Navigate to="/" />;
// };

// const AllRoutes = () => {
//   return (
//     <div>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<pages.auth.Login />} />
//         <Route path='/dashboard' element={<ProtectedRoutes />} />
//       </Routes>
//       <ToastContainer
//         position="top-left"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//       />
//     </div>
//   );
// };

// const ProtectedRoutes = () => {
//   return (
//     <div className="flex">
//       <Sidebar/>
//       <Routes>
//         {/* <Route path="/dashboard" element={<pages.dashboard.Dashboard />} /> */}
//         <Route path="/home" element={<pages.home.Home />} />
//         <Route path="/movies" element={<pages.home.AllMovies />} />
//       </Routes>
//     </div>
//   );
// };

// export default AllRoutes;
