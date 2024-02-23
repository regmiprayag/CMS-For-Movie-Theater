import React from 'react'

const MovieDetails = ({movie}) => {
    console.log("Inside movie Details page",movie)
  return (
    <div>
        <div className="max-w-sm border border-blue p-3 w-64 h-96 bg-gray-800 rounded-md gap-4 shadow-2xl">
      <div className="mt-4 mx-2">
        <div class="relative group">
          <img
            src={`http://localhost:8000/images/${movie.posterUrl}`}
            className="h-56 w-full rounded-xl"
            alt="dummy"
          />
          <div className="text-2xl mt-4">{movie && movie.title}</div>
          <div className="text-sm text-gray-400">2 Hours</div>
          <div className="text-sm text-gray-400">Drama, Action</div>
          {/* <!-- Buttons container --> */}
        </div>
      </div>
    </div>
    </div>
  )
}

export default MovieDetails