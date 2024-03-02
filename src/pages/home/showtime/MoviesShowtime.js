import React, { useEffect, useState } from 'react'
import { getAllMovies, getAllShows } from '../../../api-helpers/api';

const MoviesShowtime = () => {
    const [movie, setMovie] = useState([]);
    const [showtimes, setShowtimes] = useState([]);
    useEffect(() => {
        getAllMovies().then((res) => {
          // console.log("From api all movies are: ",res.movies[0]._id)
          setMovie(res.movies);
        });
      }, []);
    useEffect(()=>{
        getAllShows()
          .then((res)=>{
            setShowtimes(res.showtime);
          })
    },[])

    // console.log("All showtimes are: ",showtimes[0].showTime)

    showtimes?.map((showtime)=>{console.log(showtime.showTime)})
    
  return (
    <div className="container mx-auto px-4 py-8 text-white">
    <h1 className="text-3xl font-bold mb-4">Movies and Showtimes</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Render movies */}
      {movie?.map((movie) => (
        <div key={movie.id} className="border p-4 rounded-md shadow-md">
          <h2 className="text-xl font-bold mb-2">
            {movie.title}
            </h2>
          <p className="mb-4">{movie.description}</p>
          <p className="mb-4 text-xl text-red-600">Showtimes</p>
          {/* <button className="mb-4 px-2 border border-white rounded-lg">{showtimes[0].showTime}</button> */}
          {showtimes?.map((showtime)=>{
            <button className='mb-4 px-2 border border-white rounded-lg'>{showtime.showTime}</button>
        })}
          {/* <button className="mb-4 px-2 border border-white rounded-lg">{showtimes.map((showtime)=>{
            
          })}</button> */}
          
        </div>
      ))}
    </div>
  </div>
  )
}

export default MoviesShowtime