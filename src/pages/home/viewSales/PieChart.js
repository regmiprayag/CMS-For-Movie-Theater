import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';
import { getAllBookings } from '../../../api-helpers/api';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

const PieChart = () => {
    const [allBookings, setAllBookings] = useState([]);
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                data: [],
                backgroundColor: []
            }
        ]
    });

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await getAllBookings();
                setAllBookings(res.bookings);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            }
        };

        fetchBookings();
    }, []);

    useEffect(() => {
        if (allBookings.length > 0) {
            // Filter out undefined movie names
            const validBookings = allBookings.filter(booking => booking.moviename);
            
            const movieCounts = validBookings.reduce((acc, booking) => {
                const movieName = booking.moviename;
                if (!acc[movieName]) {
                    acc[movieName] = 0;
                }
                acc[movieName]++;
                return acc;
            }, {});

            const totalBookings = validBookings.length;
            const labels = Object.keys(movieCounts);
            const data = Object.values(movieCounts).map(count => ((count / totalBookings) * 100).toFixed(2));
            const backgroundColor = ['pink', 'darkblue', 'yellow', 'green', 'red', 'purple'];

            setChartData({
                labels: labels,
                datasets: [
                    {
                        data: data,
                        backgroundColor: backgroundColor.slice(0, labels.length) // Ensure we have enough colors
                    }
                ]
            });
        }
    }, [allBookings]);

    const options = {};

    return (
        <div>
            <Pie data={chartData} options={options} />
        </div>
    );
};

export default PieChart;
