import React,{useEffect,useState} from 'react'
import { useSelector } from 'react-redux'
import { getAllMovies } from '../../api-helpers/api'
import MovieDetails from './movieDetails/MovieDetails'

const Home = () => {
  // const isAdminLoggedIn = useSelector((state)=>state.user.isLoggedIn);
  // useEffect(()=>{
  //   console.log("from homepage ",isAdminLoggedIn)
  // },[isAdminLoggedIn])
  const [movies, setMovies] = useState([])
  
  useEffect(()=>{
    getAllMovies()
      .then((res)=>{
        // console.log("From api all movies are: ",res.movies[0]._id)
        setMovies(res.movies);
      })
  },[])

  // useEffect(()=>{
    
  // },[movies])
  console.log("All movies are",movies)
  return (
    <div className='text-white w-full bg-pink-400'>
      <div className='allMovies flex gap-4 p-4'>
          {movies?.map((movie) => (
            <div key={movie._id}>
            <MovieDetails movie={movie} />
            </div>
          ))}
        </div>
    </div>
  )
}

export default Home