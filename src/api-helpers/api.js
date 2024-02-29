import axios from "axios"
import { toast } from "react-toastify"

export const checkAdmin = async(data)=>{
    const {email,password} = data
    try{
        const res = await axios.post(`http://localhost:8000/login/admin`,{
            email,
            password
        });
        const resData = res.data;
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

    const resData = await res.data;
    return resData;
}

//getting the admin Details 
export const adminDetails = async () => {
    const res = await axios.get('http://localhost:8000/cms/admins', {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        }
    })
    const data = await res.data;
    return data;
};

//Creating movie by admin
export const createMovie = async(formData)=>{
    const res = await axios.post('http://localhost:8000/cms/movies',formData, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        }
    }).catch((err)=>{
        console.log("error aayo hay",err)
    })
    toast.success(res.data.message);
    const data = await res.data;
    return data;
}

// Deleting a movie
export const deleteMovie = async (id) =>{
    const res = await axios.delete(`http://localhost:8000/cms/movies/${id}`,{
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        }
    }).catch((err)=>{
        console.log("Error chai while deleting: ",err)
    })
    const data = await res.data;
    toast.success("Deleted Succesfully");
    return data;
}

//Edit movie api banako heram milxa kii nai haita.
export const editMovie = async(id, formData)=>{
    const res = await axios.put(`http://localhost:8000/cms/movies/${id}`, formData, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        }
    }).catch((err)=>{
        console.log("error aayo hay",err)
    })
    // console.log("Frontend api after backend: ",res);
    const resData = await res.data;
    toast.success(resData.message);
    return resData; 
}

// Getting a movie by it's id inorder to get the values so that we can edit the values
export const getMovieById = async (id) =>{
    let res=await axios.get(`http://localhost:8000/cms/movies/${id}`,{
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        }
    }).catch((err)=>console.log(err));
    const resData = await res.data;
    return resData; 
}

// Creating a showtime for a movie
export const createShowtime = async(formData,movieId)=> {
    const res = await axios.post(`http://localhost:8000/cms/movies/addshows/${movieId}`,formData,{
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        }
    }).catch(err=>{console.log("Createshowtime api ko error aayo",err)})

    toast.success("Showtime  added successfully!");
    // console.log("Yo chai response aayo hai", res);
    const resData = await res.data;
    return resData;
}