import React, { useState, useEffect } from 'react';
import { checkAdmin } from '../../api-helpers/api';
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../store/userSlice';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAdminLoggedIn = useSelector((state)=>state.user.isLoggedIn);

    // useEffect(()=>{
    //     console.log("IsAdminLoggedIn hmm ",isAdminLoggedIn);
    // },[isAdminLoggedIn])
    
    const handleLogin = () => {
      const data = {
        email,
        password
      }
    //   console.log("Admin details are: ",data);

    checkAdmin(data)
       .then((res)=>{
        // console.log("Response messages are: ",res)
           dispatch(userActions.login())
        // localStorage.setItem("adminId",)
            localStorage.setItem("adminId", res.admin._id)
            localStorage.setItem("adminToken", res.token)
            localStorage.setItem("adminName",res.admin.name)
           toast.success(res.message);
           navigate("/cms/dashboard");
        
    }).catch(err => toast.error(err));
    };
    
    return (
        <div className="bg-blue-900 w-1/3 h-96 flex flex-col items-center justify-center my-40 mx-auto p-10 rounded-2xl text-white">
            <h1 className="text-3xl font-bold mb-12">Admin Login</h1>
            <div className="w-80">
                <div className='my-2'>Email</div>
                <input
                    type="text"
                    placeholder="admin@gmail.com"
                    className="w-full py-2 px-4 mb-4 rounded border-gray-300 focus:outline-none focus:border-blue-500 text-black"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <div className='my-2'>Password</div>
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full py-2 px-4 mb-4 rounded border-gray-300 focus:outline-none focus:border-blue-500 text-black"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    className="w-full bg-blue-500 text-white py-2 px-4 my-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    onClick={handleLogin}
                >
                    Login
                </button>
            </div>
        </div>
    );
};

export default Login;
