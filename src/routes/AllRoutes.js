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
import { userActions } from '../store/userSlice';

const AllRoutes = () => {

  const isAdminLoggedIn = useSelector((state)=>state.user.isLoggedIn);
  
  const dispatch = useDispatch()  
  useEffect(()=>{
    if(localStorage.getItem("adminId")){
      dispatch(userActions.login())
    }
    // console.log("Is admin loggedin ",isAdminLoggedIn);
  },[isAdminLoggedIn])
  
  return (
    <div>
        <Routes>
          <Route path='/cms' element={<PrivateRoute element={<DefultLayout/>}/>}>
              <Route path='dashboard' element={<pages.home.Home/>}/>
              <Route path='movies' element={<pages.home.AllMovies/>}/>
              <Route path='movie/addmovie' element={<pages.home.CreateMovie/>}/>
              <Route path='movie/editMovie/:id' element={<pages.home.EditMovie/>}/>
              <Route path='movie/addShowtime' element={<pages.home.showtime.AddShowtime/>}/>
              <Route path='movies/showtime' element={<pages.home.showtime.MoviesShowtime/>}/>
              <Route path='bookings' element={<pages.home.SeeBookings/>}/>
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


