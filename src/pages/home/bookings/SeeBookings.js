import React, { useEffect, useState } from 'react'
import { getAllBookings } from '../../../api-helpers/api'

const SeeBookings = () => {
    const [bookings, setbookings] = useState([])
    // getAllBookings();
    useEffect(()=>{
        getAllBookings()
            .then((res)=>{
                console.log("From frontend: ",res)
                setbookings(res)
            })
    },[])
    // console.log("The bookings values are: ",bookings)
    return (
        <div className='bg-slate-300 text-black text-3xl mt-16 mb-10 mr-10 w-full'>
            <div className='bg-slate-400 flex justify-center'>All Bookings</div >
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
            {
                bookings?.map((booking)=>(
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {/* {movie.title} */}
                        {/* {booking._id} */}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {/* {formattedDate(movie.releaseDate)} */}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {/* {movie.actors} */}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  
                </td>
              </tr>
          ))
        }
        </tbody> 
        </table>
      </div>
        </div>
    )
}

export default SeeBookings