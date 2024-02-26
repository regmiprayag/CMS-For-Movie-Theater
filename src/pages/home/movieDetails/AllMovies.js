import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { deleteMovie, getAllMovies } from "../../../api-helpers/api";
import { Card, Typography } from "@material-tailwind/react";
import {useNavigate} from "react-router-dom"

const AllMovies = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate()

  const formattedDate = (dateString) => {
    const releaseDate = new Date(dateString);
    return releaseDate.toISOString().split("T")[0];
  };

  useEffect(() => {
    getAllMovies().then((res) => {
      // console.log("From api all movies are: ",res.movies[0]._id)
      setMovies(res.movies);
    });
  }, []);

  const handleClick = async(id)=>{
    deleteMovie(id)
      .then((res)=>{
        navigate("/cms/dashboard")
      })
  }

  const handleEdit = async(id)=>{
    // console.log("Clicked in the movieId: ",id);
    navigate(`/cms/movie/editMovie/${id}`);
  }

  useEffect(()=>{
    // console.log("Movies bhetey paxi ko part",movies[0]._id)
  },[movies])

  // console.log("All movies to render are ", movies);
  return (
    <div className="mt-20 mx-12 w-full">
      <h1 className="text-white text-3xl my-4">List of all Movies</h1>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Title
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Release Date
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actors
            </th>
            <th scope="col" className="px-12 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {movies.map((movie) => (
            <tr key={movie.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {movie.title}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {formattedDate(movie.releaseDate)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {movie.actors}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                {/* <a href="#" className="text-indigo-600 mx-4 bg-blue-300 px-4 p-1 rounded-xl hover:bg-blue-400">
                  Edit
                </a> */}
                <button onClick={()=>{handleEdit(movie._id)}} className="text-indigo-600 mx-4 bg-blue-300 px-4 p-1 rounded-xl hover:bg-blue-400">Edit</button>

                <a href="#" className="text-white mx-4 bg-red-600 px-4 p-1 rounded-xl hover:bg-red-400">
                  <button onClick={()=>handleClick(movie._id)}>Delete</button>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default AllMovies;
