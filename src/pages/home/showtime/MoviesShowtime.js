import React, { useEffect, useState } from "react";
import { getAllMovies, getAllShows } from "../../../api-helpers/api";
import showtime from ".";

const MoviesShowtime = () => {
  const [movie, setMovie] = useState([]);
  const [showtimes, setShowtimes] = useState([]);
  useEffect(() => {
    getAllMovies().then((res) => {
      // console.log("From api all movies are: ",res.movies[0]._id)
      setMovie(res.movies);
    });
  }, []);
  useEffect(() => {
    getAllShows().then((res) => {
      setShowtimes(res.showtime);
    });
  }, []);

  // useEffect(()=>{
  //   // console.log("hello")
  //   showtimes.filter((showtime)=> showtime.movieId == movie._id).map((showtime)=>(
  //     console.log(showtime)
  //   ))
  // },[movie,showtimes])

  // console.log("Showtime and movie are: ",showtimes[0],movie[0])

  // useEffect(() => {
  //   showtimes
  //     .filter((showtime) => showtime.movieId === String(movie._id))
  //     .map((showtime) => console.log(showtime));
  // }, [movie,showtimes]);

  showtimes?.map((showtime)=>{console.log(movie)})
  return (
    <div className="container mx-auto px-4 py-8 text-white">
      <h1 className="text-3xl font-bold mb-4">Movies and Showtimes</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Render movies */}
        {movie?.map((movie) => (
  <div key={movie.id} className="border p-4 rounded-md shadow-md">
    <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
    <p className="mb-4">{movie.description}</p>
    <p className="mb-4 text-xl text-red-600">Showtimes</p>
    {/* <button className="mb-4 px-2 border border-white rounded-lg">{showtimes[0].showTime}</button> */}
    <div className="bg-slate-400 p-4 w-40">
      {showtimes?.map((showtime) => (
        <div className="m-2">
          <button className="mb-4 px-2 text-white border border-white rounded-lg">
            {showtime.showTime}
          </button>
          <button
            // onClick={() => handleOpen()}
            type="submit"
            className="mb-6 w-20 rounded-lg bg-[#1d4ed8] px-6 py-2.5 text-center text-sm font-medium text-white hover:bg-[#140044]/90 focus:outline-none"
          >
            Update
          </button>
        </div>
      ))}
      
    </div>
    <div className="mt-4 grid grid-cols-1 gap-6 p-6 px-6 sm:grid-cols-2"></div>
  </div>
))}
        <div className="bg-pink-400"></div>
      </div>
    </div>
  );
};

// {movieShowtime
//   .filter((showtime) => showtime.movieId === movie._id)
//   .map((showtime) => (
//     <button
//       key={showtime._id}
//       onClick={() => handleClick(showtime._id,showtime.showTime,showtime.showDate)}
//       // className="border border-white p-1 w-20 mt-4 mr-1 rounded-md text-white mb-1 hover:bg-green-500"
//       className="border border-white w-18 text-sm mt-4 p-1 mx-1 hover:bg-green-500 rounded-md"
//     >
//       {showtime.showTime}
//     </button>
//   ))}

// {movie?.map((movie) => (
//   <div key={movie.id} className="border p-4 rounded-md shadow-md">
//     <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
//     <p className="mb-4">{movie.description}</p>
//     <p className="mb-4 text-xl text-red-600">Showtimes</p>
//     {/* <button className="mb-4 px-2 border border-white rounded-lg">{showtimes[0].showTime}</button> */}
//     <div className="bg-slate-400 p-4 w-40">
//       {showtimes?.map((showtime) => (
//         <div className="m-2">
//           <button className="mb-4 px-2 text-white border border-white rounded-lg">
//             {showtime.showTime}
//           </button>
//           <button
//             // onClick={() => handleOpen()}
//             type="submit"
//             className="mb-6 w-20 rounded-lg bg-[#1d4ed8] px-6 py-2.5 text-center text-sm font-medium text-white hover:bg-[#140044]/90 focus:outline-none"
//           >
//             Update
//           </button>
//         </div>
//       ))}
      
//     </div>
//     <div className="mt-4 grid grid-cols-1 gap-6 p-6 px-6 sm:grid-cols-2"></div>
//   </div>
// ))}

export default MoviesShowtime;
