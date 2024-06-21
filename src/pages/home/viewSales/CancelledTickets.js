import React, { useEffect, useState } from 'react';
import { getCancelledBookings, getUserById } from '../../../api-helpers/api';

const CancelledTickets = () => {
  const [cancelledBookings, setCancelledBookings] = useState([]);

  useEffect(() => {
    getCancelledBookings().then((res) => {
      setCancelledBookings(res.message);
    }).catch((err) => {
      console.log("Error fetching cancelled bookings: ", err);
    });
  }, []);

  return (
    <div className='p-4'>
      <h2 className='text-2xl mb-4'>Cancelled Tickets</h2>
      {cancelledBookings.length > 0 ? (
        <table className='min-w-full bg-white text-lg'>
          <thead>
            <tr>
              <th className='py-2 px-4 border-b'>Movie Title</th>
              <th className='py-2 px-4 border-b'>Showtime</th>
              <th className='py-2 px-4 border-b'>Date</th>
              <th className='py-2 px-4 border-b'>Cancelation Reason</th>
              <th className='py-2 px-4 border-b'>Price</th>
            </tr>
          </thead>
          <tbody>
            {cancelledBookings.map((booking) => (
              <tr key={booking.id}>
                <td className='py-2 px-4 border-b'>{booking.moviename}</td>
                <td className='py-2 px-4 border-b'>{booking.showtime}</td>
                <td className='py-2 px-4 border-b'>{new Date(booking.showdate).toLocaleDateString()}</td>
                {/* <td className='py-2 px-4 border-b'>{booking.seats.join(', ')}</td> */}
                <td className='py-2 px-4 border-b'>{booking.cancellationReason}</td>
                <td className='py-2 px-4 border-b'>{booking.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No cancelled tickets available.</p>
      )}
    </div>
  );
};

export default CancelledTickets;
