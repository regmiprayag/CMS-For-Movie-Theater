import React, { useEffect, useState } from "react";
import { getAllBookings, getAllMovies } from "../../../api-helpers/api";

const SeeBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getAllBookings()
      .then((res) => {
        setBookings(res.bookings);
      })
      .catch((err) => console.error("Error fetching bookings: ", err));
  }, []);

  useEffect(() => {
    getAllMovies()
      .then((res) => {
        setMovies(res.movies);
      })
      .catch((err) => console.error("Error fetching movies: ", err));
  }, []);

  const getMovieDetails = (movieId) => {
    return movies.find((movie) => movie._id === movieId) || {};
  };

  return (
    <div className="bg-slate-300 text-black text-3xl mt-16 mb-10 mr-10 w-full">
      <div className="bg-slate-400 flex justify-center">All Bookings</div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Customer Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Movie Title
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Booking Date
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Booked Seats
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings.map((booking) => {
              const movieDetails = getMovieDetails(booking.movieId);
              return (
                <tr key={booking._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="ml-4">
                        <div className="text-sm font-medium text-red-900">
                          {booking.username}
                        </div>
                      </div>
                      {/* {booking} */}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {movieDetails.title || "N/A"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(booking.bookingDate).toLocaleDateString() ||
                        "N/A"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {booking.bookedSeat
                      ? booking.bookedSeat.join(", ")
                      : "N/A"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SeeBookings;
