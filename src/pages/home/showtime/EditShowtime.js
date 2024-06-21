import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { editShowtime } from "../../../api-helpers/api";
import emailjs from "@emailjs/browser"

const EditShowtime = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showDate, setShowDate] = useState(null);
  const [showtime, setshowtime] = useState(null);
  const movieId = sessionStorage.getItem("movieId");
  const showtimeId = sessionStorage.getItem("showtimeId");
  const showtimeSession = sessionStorage.getItem("showtime");
  const showDateSession = sessionStorage.getItem("showDate");

  const handleSubmit = (e) => {
    e.preventDefault();
    const regex = /^(0?[1-9]|1[0-2]):([0-5][0-9])\s?(am|pm)$/i;
    // console.log(regex.test(showtime));

    if (!regex.test(showtime)) {
      alert("Invalid showtime format");
      return;
    }

    editShowtime(showtime, showtimeId).then((res) => {

      // console.log("The response is: ",res," ",showtime)
      // const message = (res.message," ",showtime);
      // console.log("The message is: ",message)
      const serviceId = "service_4yrkjoc";
      const templateId = "template_npbqlmg";
      const publicKey = "BPhN3L6ojSsbweMr_";

      const data = {
        serviceId: "Service",
        templateId: "template_npbqlmg",
        userId: publicKey,
      };
      const templateParams = {
        from_name: "Prayag Regmi",
        from_email: "prayag@bigmovies.com.np",
        to_name: "Bishal Regmi",
        message: showtime,
      };

      console.log("The details in data are: ", data);
      emailjs.send(serviceId, templateId, templateParams, publicKey).then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
        },
        (error) => {
          console.log("FAILED...", error);
        }
      );

      navigate("/cms/movies/showtime");
    });
    // console.log("The showDate and showtime are: ", showtime);
    // navigate("/cms/movies/showtime")
  };
  const handleClick = () => {
    navigate("/cms/movies/showtime");
  };
  return (
    <div className="bg-slate-400 text-white h-fit m-10 p-10">
      <form className="" onSubmit="">
        <div className="relative mt-4 grid  gap-6">
          <div className="bg-slate-600 p-2 text-white flex justify-center">
            {showDateSession}
          </div>

          <div>
            <label
              className="block text-lg font-medium text-black"
              htmlFor="price"
            >
              {" "}
              Change Showtime{" "}
            </label>
            <input
              type="text"
              step="1"
              //   value={showtimeSession}
              className="form-control px-12 p-1 rounded-xl text-black  text-xl"
              placeholder="Time"
              onChange={(event) => {
                setshowtime(event.target.value);
              }}
              required
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
            onClick={(e) => {
              handleSubmit(e);
            }}
            type="submit"
            className="mb-6 w-full rounded-lg bg-[#1d4ed8] px-6 py-2.5 text-center text-sm font-medium text-white hover:bg-[#140044]/90 focus:outline-none"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditShowtime;
