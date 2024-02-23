import { Navbar } from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import React,{ useEffect } from 'react'
import {
  Routes,
  Route
} from "react-router-dom";
import * as pages from '../pages';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import PrivateRoute from './PrivateRoutes';
// import PrivateRoute from '../../../frontend/src/routes/PrivateRoute';
import { Navigate } from 'react-router-dom';
import DefultLayout from '../layout/DefultLayout';

const AllRoutes = () => {

  const isAdminLoggedIn = useSelector((state)=>state.user.isLoggedIn);
  console.log("Is admin loggedin ",isAdminLoggedIn);

  useEffect(()=>{

  },[isAdminLoggedIn])
  

  return (
    <div>
        {/* <Navbar/> */}
        {/* <Sidebar/> */}
        <Routes>
           {/* <Route path='/login/admin' element={<pages.auth.Login/>}/>

            <Route path='/dashboard' element={<PrivateRoute element={<Sidebar/>} />}>
            <Route path='home' element={<PrivateRoute element={<pages.home.Home/>}/>}/>
            <Route path='movies' element={<PrivateRoute element={<pages.home.AllMovies/>}/>}/>
          </Route>

          <Route path='/dashboard' element={<PrivateRoute element={<Sidebar/>}/>}></Route> */}

          <Route path='/cms' element={<PrivateRoute element={<DefultLayout/>}/>}>
              <Route path='dashboard' element={<pages.home.Home/>}/>
              <Route path='movies' element={<pages.home.AllMovies/>}/>
          </Route>
          
          <Route path='/login/admin' element={<pages.auth.Login/>}/>
          <Route path='/' element={<pages.auth.Login/>}/>


          {/* <Route path='/dashboard' element={<PrivateRoute element={<pages.booking.Booking/>}/> */}
        </Routes>
        <ToastContainer 
          position="top-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
    </div>
  )
}

export default AllRoutes


