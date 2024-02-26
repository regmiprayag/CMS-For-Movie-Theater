import React, { useEffect, useState } from "react";
import { RiImageAddFill } from "react-icons/ri";
import { setInForm } from "../../../lib";
import { useNavigate } from "react-router-dom";
import http from "../../../http";
import { toast } from "react-toastify";

const Create = () => {
  const [form, setForm] = useState("");
  const [image, setImage] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [price, setPrice] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    http
      .get("/teacher")
      .then(({ data }) => {
        setTeachers(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handelSubmit = (ev) => {
    ev.preventDefault();
    if (image) {
      if (image.size > 10485760) {
        toast.error("Image size should be less than 10MB.");
        return;
      }
    }

    const data = {
      classname: form.classname,
      image: image,
      shift: form.shift,
      price: price,
      description: form.description,
      startdate: form.sdate,
      enddate: form.edate,
      time: form.time,
      teacherid: form.teacher,
    };

    http
      .post("/admin/class", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        console.log(resp);
        console.log(resp.data.error);
        if (!resp.data.error) {
          navigate("/dashboard/classes");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const handlePrice = (x) => {
  //   const regex = /^\d*$/;
  //   if (!regex.test(x)) {

  //     console.log(x);
  //     toast.error("Invalid Price... !!!");
  //   } else {
  //     setPrice(x);
  //     console.log(price);
  //   }
  // };
  const handlePrice = (input) => {
    const numericInput = input.replace(/\D/g, "");
    setPrice(numericInput);
  };

  return (
    <div className="m-10">
      <div className="mx-auto max-w-7xl rounded-md bg-[#ACD7DD] p-6 shadow-xl">
        <div className="space-y-6 p-6 sm:p-8">
          <h1 className="text-center text-xl font-bold leading-tight tracking-tighter text-black md:text-2xl">
            Create New Dance Classes
          </h1>
        </div>
        <form className="space-y-4 md:space-y-6" onSubmit={handelSubmit}>
          <div className="relative mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="">
              <label
                className=" text-sm font-medium text-black"
                htmlFor="classname"
              >
                Class Name
              </label>
              <input
                name="classname"
                type="text"
                className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 px-4 py-2 text-black focus:border-blue-500 focus:outline-none focus:ring sm:text-sm"
                onChange={(ev) => setInForm(ev, form, setForm)}
                // required
              />
            </div>

            <div className="">
              <label
                className="mb-2  text-sm font-medium text-black"
                htmlFor="shift"
              >
                Shift
              </label>
              <input
                name="shift"
                type="text"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 px-4 py-2 text-black focus:border-blue-500 focus:outline-none focus:ring sm:text-sm"
                onChange={(ev) => setInForm(ev, form, setForm)}
                // required
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-black"
                htmlFor="sdate"
              >
                Start Date
              </label>
              <input
                name="sdate"
                type="date"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 px-4 py-2 text-black focus:border-blue-500 focus:outline-none focus:ring sm:text-sm"
                onChange={(ev) => setInForm(ev, form, setForm)}
                // required
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-black"
                htmlFor="edate"
              >
                End Date
              </label>
              <input
                name="edate"
                type="date"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 px-4 py-2 text-black focus:border-blue-500 focus:outline-none focus:ring sm:text-sm"
                onChange={(ev) => setInForm(ev, form, setForm)}
                // required
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-black"
                htmlFor="price"
              >
                Price
              </label>
              <input
                name="price"
                type="text"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 px-4 py-2 text-black focus:border-blue-500 focus:outline-none focus:ring sm:text-sm"
                onChange={(ev) => handlePrice(ev.target.value)}
                // required
                value={price}
              />
            </div>

            <div>
              <label
                htmlFor="teacher"
                className="block text-sm font-medium text-black"
              >
                Time
              </label>
              <select
                name="time"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 px-4 py-2 text-black focus:border-blue-500 focus:outline-none focus:ring sm:text-sm"
                onChange={(ev) => setInForm(ev, form, setForm)}
              >
                <option value="-1">Select Time</option>
                <option value="6am to 7am">6am to 7am</option>
                <option value="7am to 8am">7am to 8am</option>
                <option value="8am to 9am">8am to 9am</option>
                <option value="9am to 10am">9am to 10am</option>
                <option value="6pm to 7pm">6pm to 7pm</option>
                <option value="7pm to 8pm">7pm to 8pm</option>
                <option value="8pm to 9pm">8pm to 9pm</option>
                <option value="9pm to 10pm">9pm to 10pm</option>
              </select>
            </div>

            <div>
              <label
                className="block text-sm font-medium text-black"
                htmlFor="teacher"
              >
                Teacher
              </label>
              <select
                name="teacher"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 px-4 py-2 text-black focus:border-blue-500 focus:outline-none focus:ring sm:text-sm"
                onChange={(ev) => setInForm(ev, form, setForm)}
                required
              >
                <option value="-1">Select Teacher</option>
                {teachers.map((teacher) => (
                  <option key={teacher._id} value={teacher._id}>
                    {teacher.fullname}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                className="hidden text-sm font-medium text-black"
                htmlFor="capacity"
              >
                Capacity
              </label>
              <input
                name="capacity"
                type="text"
                className="hidden w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 px-4 py-2 text-black focus:border-blue-500 focus:outline-none focus:ring sm:text-sm"
                onChange={(ev) => setInForm(ev, form, setForm)}
                readOnly
                // required
              />
            </div>

            <div className="md:col-span-full lg:col-span-2">
              <label
                className="block text-sm font-medium text-black"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                type="textarea"
                rows="6"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 px-4 py-2 text-black focus:border-blue-500 focus:outline-none focus:ring sm:text-sm"
                onChange={(ev) => setInForm(ev, form, setForm)}
                // required
              ></textarea>
            </div>

            <div className="md:col-span-full lg:col-span-2">
              <label
                className="block text-sm font-medium text-black"
                htmlFor="image"
              >
                Image
              </label>
              <div className="flex justify-center rounded-md border-2 border-white px-6 pb-6 pt-4">
                <div className="space-y-1 text-center">
                  <div className="flex items-center justify-center">
                    <RiImageAddFill size={30} />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="image"
                        className="mx-2 cursor-pointer rounded-md bg-white px-1 font-medium text-[#140044] focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2"
                      >
                        Upload a file
                        <input
                          id="image"
                          name="image"
                          type="file"
                          className="sr-only"
                          onChange={(ev) => setImage(ev.target.files[0])}
                          // required
                        />
                      </label>
                    </div>
                  </div>
                  <div>
                    <p className="pl-1 text-white">or drag and drop</p>

                    <p className="text-xs text-white">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-6 p-6 px-6 sm:grid-cols-2">
            <button
              type="reset"
              className="mb-6 w-full rounded-lg bg-[#140044] px-6 py-2.5 text-center text-sm font-medium text-[#85C3CB] hover:bg-[#140044]/90 focus:outline-none"
            >
              Back
            </button>
            <button
              type="submit"
              className="mb-6 w-full rounded-lg bg-[#140044] px-6 py-2.5 text-center text-sm font-medium text-[#85C3CB] hover:bg-[#140044]/90 focus:outline-none"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;