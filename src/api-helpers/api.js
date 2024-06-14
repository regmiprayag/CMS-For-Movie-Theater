import axios from "axios"
import { toast } from "react-toastify"

export const checkAdmin = async(data)=>{
    const {email,password} = data
    // console.log("admin details are: ",data);
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
    // console.log("The movie to be created details apihelper are: ",formData);
    const res = await axios.post('http://localhost:8000/cms/movies',formData,{
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        }
    })
      .catch((err)=>{
         console.log("error aayo hay",err)
      })
    if(res){
        console.log("The response data in apihelper are: ",res);
        toast.success(res.data.message);
    }
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
    console.log("From the api");
    formData.forEach((value, key) => {
        console.log(`${key}:${value}`);
    });

    const res = await axios.put(`http://localhost:8000/cms/movies/${id}`, formData, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        }
    }).catch((err)=>{
        console.log("error aayo hay",err)
    })
    const resData = await res.data;
    console.log("Frontend api response is: ",resData.movies);
    toast.success(resData.message);
    return resData.movies; 
}

// Getting a movie by it's id inorder to get the values so that we can edit the values
export const getMovieById = async (id) =>{
    let res=await axios.get(`http://localhost:8000/cms/movies/${id}`,{
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        }
    }).catch((err)=>console.log(err));

    const resData = await res.data;
    // console.log("The picture of the movie from api is: ",resData.image)
    return resData; 
}

// Creating a showtime for a movie
export const createShowtime = async(formData,movieId)=> {
    console.log("The api details of createShowtime are: ",movieId,formData);
    const res = await axios.post(`http://localhost:8000/cms/movies/addshows/${movieId}`,formData,{
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        }
    }).catch(err=>{console.log("Createshowtime api ko error aayo",err)})

    toast.success("Showtime  added successfully!");
    console.log("Yo chai response aayo hai", res);
    // const resData = await res.data;
    // return resData;
}


export const editShowtime = async(showtime,showtimeId)=> {
    // console.log("Inside the api the formdata are: ",showtime,showtimeId)
    // return;
    const res = await axios.put(`http://localhost:8000/cms/showtimes/edit/${showtimeId}`, {showtime} ,{
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        }
    }).catch(err=>{console.log("Editing showtime api ko error aayo",err)})

    toast.success(res.data.message);
    console.log("Yo chai response aayo hai", res);
    const resData = await res.data;
    return resData;
}


export const getAllShows = async()=>{
    const res = await axios
        .get(`http://localhost:8000/showtimes`)
        .catch((err)=>{
            console.log(err)
    })
    // return;
    const data = await res.data;
    return data;
}

// Fetching the showdate for Now.
export const getAllShowsToday = async()=>{
    // console.log("Today date in api is: ");
    const res = await axios.get("http://localhost:8000/showtimesToday").catch(err=>console.log("Showtoday error ho hai ",err))

    const resData = await res.data;
    return resData;    
}

export const getAllShowsTomorrow = async()=>{
    const res = await axios.get("http://localhost:8000/showtimesTommorow").catch(err=>console.log("Tomorrow ko error ho hai ",err))
    const resData = await res.data;

    // console.log("From api tomorrow movies are: ",resData.showtime);
    return resData;    
}


// BOOKING SECTION
export const getAllBookings = async()=>{
    const res = await axios
        .get(`http://localhost:8000/bookings`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    const resData = await res.data;
    return resData;
}
