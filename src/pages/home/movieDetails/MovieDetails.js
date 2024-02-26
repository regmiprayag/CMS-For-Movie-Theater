import React from 'react'
import {useNavigate} from "react-router-dom"

const MovieDetails = ({movie}) => {
    // console.log("Inside movie Details page",movie)
    const navigate = useNavigate()

    const handleClick = async(id)=>{
      // console.log("Movie id for the showtime is: ",id)
      navigate("/cms/movie/addShowtime", {state:{id}});
    }

  return (
    <div>
        <div className="border border-blue p-3 max-w-dvw bg-gray-800 rounded-md gap-4 shadow-2xl">
        <div className="mt-4 mx-2">
        <div className="relative group">
          <img
            src={`http://localhost:8000/images/${movie.posterUrl}`}
            className="h-56 w-full rounded-xl"
            alt="dummy"
          />
          <div className="text-2xl mt-4">{movie && movie.title}</div>
          <div className="text-sm text-gray-400">2 Hours</div>
          <div className="text-sm text-gray-400">Drama, Action</div>
          {/* <!-- Buttons container --> */}
          <button onClick={()=>handleClick(movie._id)} className='w-full bg-blue-400 p-2 rounded-lg mt-2'>Add Showtime</button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default MovieDetails