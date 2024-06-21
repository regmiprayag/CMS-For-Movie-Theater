import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createMovie, createShowtime } from "../../../api-helpers/api";
import toast from "react-hot-toast";

const AddShowtime = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [actors, setActors] = useState(null);
  const [showDate, setShowDate] = useState(null);
  const [showTime, setShowTime] = useState(null);
  const [director, setDirector] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const movieId = location.state.id;
  // console.log("MovieId is: ",movieId)

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const regex = /^(0?[1-9]|1[0-2]):([0-5][0-9])\s?(am|pm)$/i;
    console.log(regex.test(showTime));

    if (!showTime || !showDate) {
      alert("Please fill all the input fields");
      return;
    }

    if (!regex.test(showTime)) {
      alert("Invalid showtime format");
      return;
    }

    const [year, month, day] = showDate.split("-").map(Number);

    // Month in JavaScript Date object starts from 0 (January) to 11 (December)
    const dateObject = new Date(year, month - 1, day);
    const newDate = dateObject.getTime();

    console.log("Today date: ", Date.now());

    console.log("After two day date: ", Date.now() + 172800000);
    // return;

    if (newDate < Date.now()) {
      alert("Showtime cannot be created for past");
      return;
    } else if (newDate > Date.now() + 172800000) {
      alert("Showtime must be created before two days");
      return;
    }

    let formData = {
      showTime,
      showDate,
    };
    // console.log("Movie id is: ",movieId,formData);
    // return;
    createShowtime(formData, movieId)
     .then((res) => {
       navigate("/cms/dashboard");
    });
  };

  const handleClick = () => {
    navigate("/cms/dashboard");
  };

  return (
    <div className="bg-blue-400 text-white h-fit m-10 p-10">
      <form className="" onSubmit="">
        <div className="relative mt-4 grid  gap-6">
          <div>
            <label
              className="block text-sm font-medium text-black"
              htmlFor="sdate"
            >
              {" "}
              Show Date{" "}
            </label>
            <input
              required
              onChange={(event) => setShowDate(event.target.value)}
              name="sdate"
              type="date"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 px-4 py-2 text-black focus:border-blue-500 focus:outline-none focus:ring sm:text-sm"
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-black"
              htmlFor="price"
            >
              {" "}
              Show Time{" "}
            </label>
            <input
              type="text"
              step="1"
              //   value={this.state.time}
              className="form-control px-12 rounded-xl text-black  text-xl"
              placeholder="Time"
              onChange={(event) => {
                setShowTime(event.target.value);
              }}
            />
            {/* <input required onChange={event => setDirector(event.target.value)} name="price" type="text" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 px-4 py-2 text-black focus:border-blue-500 focus:outline-none focus:ring sm:text-sm" /> */}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-6 p-6 px-6 sm:grid-cols-2">
          <button
            onClick={handleClick}
            type="submit"
            className="mb-6 w-full rounded-lg bg-[#be123c] px-6 py-2.5 text-center text-sm font-medium text-white hover:bg-[#140044]/90 focus:outline-none"
          >
            Back
          </button>
          <button
            onClick={handleSubmit}
            type="submit"
            className="mb-6 w-full rounded-lg bg-[#1d4ed8] px-6 py-2.5 text-center text-sm font-medium text-white hover:bg-[#140044]/90 focus:outline-none"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddShowtime;
