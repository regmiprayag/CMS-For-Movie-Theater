import React, { useEffect, useState } from 'react'
import { getAllMovies } from '../../../api-helpers/api';

const MoviesShowtime = () => {
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        getAllMovies().then((res) => {
          // console.log("From api all movies are: ",res.movies[0]._id)
          setMovies(res.movies);
        });
      }, []);

      console.log("All movies are: ",movies);

  return (
    <div className='bg-black text-white text-3xl mt-20 mx-12 w-full'>
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
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actors
              </th>
              <th
                scope="col"
                className="px-12 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              ></th>
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
                    {/* {formattedDate(movie.releaseDate)} */}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {/* <a href="#" className="text-indigo-600 mx-4 bg-blue-300 px-4 p-1 rounded-xl hover:bg-blue-400">
                  Edit
                </a> */}
                  <button
                    onClick={() => {
                    //   handleEdit(movie._id);
                    }}
                    className="text-indigo-600 mx-4 bg-blue-300 px-4 p-1 rounded-xl hover:bg-blue-400"
                  >
                    Edit
                  </button>

                  <a
                    href="#"
                    className="text-white mx-4 bg-red-600 px-4 p-1 rounded-xl hover:bg-red-400"
                  >
                    <button>Delete</button>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  )
}

export default MoviesShowtime