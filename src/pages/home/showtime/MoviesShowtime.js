import React, { useEffect, useState } from "react";
import {
  getAllMovies,
  getAllShows,
  getAllShowsToday,
  getAllShowsTomorrow,
} from "../../../api-helpers/api";
import { useNavigate } from "react-router-dom"
import showtime from ".";
// import { getAllShowsToday } from "../../../../../frontend/src/api-helpers/api-helper";

const MoviesShowtime = () => {
  const [movie, setMovie] = useState([]);
  const [showtimeToday, setShowtimeToday] = useState([]);
  const [showtimeTommorow, setShowtimeTommorow] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getAllMovies().then((res) => {
      // console.log("From api all movies are: ",res.movies[0]._id)
      setMovie(res.movies);
    });
  }, []);
  useEffect(() => {
    getAllShowsToday().then((res) => {});
    getAllShowsTomorrow().then((res) => {
      setShowtimeTommorow(res.showtime);
    });
  }, []);

  useEffect(() => {
    movie?.map((movie, index) => {
      // console.log("The map movies are: ",movie._id);
      // if(movie._id == showtimeTommorow)
      // console.log("Showtime maa chai k raixa ta herdim na: ",showtimeTommorow[0].movieId);
      showtimeTommorow.map((showtime, index) => {
        // console.log("The showtimes are: ",showtime.movieId);
        if (movie._id == showtime.movieId) {
          // console.log("Milyo yarr")
        }
      });
    });
  }, [movie]);

  const handleClick = async (movieId,showtimeId,showtime,showDate) => {
    // setOpenForm(true);
    const data = {
      movieId: movieId,
      showtimeId:showtimeId,
      showtime:showtime,
      showDate:showDate,
    }
    sessionStorage.setItem("movieId",movieId)
    sessionStorage.setItem("showtimeId",showtimeId)
    sessionStorage.setItem("showtime",showtime)
    sessionStorage.setItem("showDate",showDate)
    
    // console.log("The details are: ",data);
    navigate("/cms/movie/editShowtime");
  };

  return (
    <div className="container mx-auto px-4 py-8 text-white">
      <h1 className="text-3xl font-bold mb-4">Movies and Showtimes</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-xl">
        
        {movie.map((movie) => {
          // Filter showtimes for tomorrow for the current movie
          const movieShowtimes = showtimeTommorow.filter(
            (showtime) => showtime.movieId === movie._id
          );

          // Check if there are showtimes for tomorrow for the current movie
          if (movieShowtimes.length > 0) {
            return (
              <div
                key={movie._id}
                className="border border-blue p-3 max-w-dvw bg-gray-800 rounded-md gap-4 shadow-2xl"
              >
                <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
                <p className="text-lg mb-4">{movie.description}</p>
                <p className="mb-4 text-xl text-pink-400">
                  Tommorow Showtimes:{" "}
                </p>
                <ul>
                  {movieShowtimes.map((showtime) => (
                    <div className="flex gap-2 mt-2">
                      <li
                        className="border border-blue px-4 py-1 rounded-xl"
                        key={showtime._id}
                      >
                        {showtime.showTime}
                      </li>
                      <button
                        onClick={()=>{handleClick(movie._id,showtime._id,showtime.showTime,showtime.showDate)}}
                        className="bg-blue-600 px-3 py-1 rounded-xl"
                        key={showtime._id}
                      >
                        Edit
                      </button>
                    </div>
                  ))}
                </ul>
                
              </div>
            );
          } else {
            // Render if there are no showtimes for tomorrow for the current movie
            return (
              <div
                key={movie._id}
                className="border border-blue p-3 max-w-dvw bg-gray-800 rounded-md gap-4 shadow-2xl"
              >
                <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
                <p className="text-lg">{movie.description}</p>
                <p className="mt-10 text-xl text-red-600">
                  No showtimes for tomorrow
                </p>
              </div>
            );
          }
        })}
        <div className="bg-pink-400"></div>
      </div>
    </div>
  );
};

export default MoviesShowtime;
