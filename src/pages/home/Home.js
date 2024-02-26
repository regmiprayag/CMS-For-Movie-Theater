import React,{useEffect,useState} from 'react'
import { useSelector } from 'react-redux'
import { getAllMovies } from '../../api-helpers/api'
import MovieDetails from './movieDetails/MovieDetails'
import {useNavigate} from "react-router-dom"

const Home = () => {
  // const isAdminLoggedIn = useSelector((state)=>state.user.isLoggedIn);
  // useEffect(()=>{
  //   console.log("from homepage ",isAdminLoggedIn)
  // },[isAdminLoggedIn])
  const [movies, setMovies] = useState([])
  const [movieModel, setMovieModel] = useState(false)  
  const navigate = useNavigate()

  useEffect(()=>{
    getAllMovies()
      .then((res)=>{
        // console.log("From api all movies are: ",res.movies[0]._id)
        setMovies(res.movies);
      })
  },[])
  const handleClick = ()=>{ 
    navigate("/cms/movie/addmovie");
  }

  // console.log("All movies are",movies)
  return (
    <div className='w-full mx-12'>
       <div className='flex w-full text-white mt-20'>
        <div className='text-5xl m-auto'>All Movies</div>
        <button onClick={handleClick} className='bg-blue-400 px-6 rounded-2xl'>Add Movie</button>
      </div>
    <div className='text-white w-full'>
      <div className='allMovies flex gap-4 p-4 grid grid-cols-1 md:grid-cols-3 lg:gird-cols-4 '>
          {movies?.map((movie) => (
            <div key={movie._id}>
              <MovieDetails movie={movie} />
            </div>
          ))}
        </div>
    </div>
        
    </div>
  )
}

export default Home