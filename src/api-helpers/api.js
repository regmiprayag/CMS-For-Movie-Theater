import axios from "axios"
import { toast } from "react-toastify"

export const checkAdmin = async(data)=>{
    const {email,password} = data
    // console.log("Email ra password aayo ",email,password)
    try{
        const res = await axios.post(`http://localhost:8000/login/admin`,{
            email,
            password
        });
        const resData = res.data;
        console.log("From the response aako ",res)
        // return res.json({res})
        // toast.success(resData.message)
        console.log("Resdata ",resData);
        return resData;
    }catch(err){
        // console.log("error ho hai",err.response.data.message)
        return Promise.reject(err.response.data.message);
    }
}

//getting all movies to show in dashboard for admin
export const getAllMovies = async()=>{
    const res = await axios
       .get(`http://localhost:8000/movies`)
        .catch((err)=>{console.log(err)})

    // console.log(res);
    const resData = await res.data;
    return resData;
    
}

//getting the admin Details 
export const adminDetails = async () => {
    const res = await axios.get('http://localhost:8000/cms/admins', {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`
        }
    })
    const data = await res.data;
    return data;
};